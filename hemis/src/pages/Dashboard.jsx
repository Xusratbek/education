import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Zamdekan from '../roles/Zamdekan';
import Oqtuvchi from '../roles/Oqtuvchi';
import Rahbaryat from '../roles/Rahbaryat';
import Talaba from '../roles/Talaba';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

  return (
    <div style={{marginLeft:"540px",marginTop:"-220px"}}>
      <h1>Dashboard</h1>
      {role === 'zamdekan' && <Zamdekan />}
      {role === 'oqtuvchi' && <Oqtuvchi />}
      {role === 'raxbaryat' && <Rahbaryat />}
      {role === 'talaba' && <Talaba />}
    </div>
  );
};

export default Dashboard;
