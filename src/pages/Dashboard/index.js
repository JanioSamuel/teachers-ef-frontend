import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import dotenv from 'dotenv';

import './styles.css';

export default function Dashboard() {
  const [teachers, setTeachers] = useState([]);
  dotenv.config();
  const efUrl = process.env.REACT_APP_EF_URL;
  useEffect(() => {
    async function loadTeachers() {
      const response = await api.get('/');
      const result = [];
      response.data.teachersData.teachers.forEach(t => {
        if (t.avatarUrl !== undefined) {
          result.push(t);
        }
      });
      setTeachers(result);
    }
    loadTeachers();
  }, []);

  return (
    <div>
      <div className="title"><strong>EF Teachers</strong></div>
      <ul className="teacher-card">
        {teachers.map(teacher => (
          <li key={teacher.memberId}>
            <div style={{ color: `${teacher.bilingualism}` !== '' ? 'red' : 'black' }} title={`${teacher.bilingualism}`}><p>{teacher.nickName}</p></div>
            <img src={`${efUrl}${teacher.avatarUrl}`} title={`${teacher.quote} \n\n Bilingualism: ${teacher.bilingualism}`} alt={`${teacher.quote}`}/>
          </li>
        ))}
      </ul>
    </div>
  )
}