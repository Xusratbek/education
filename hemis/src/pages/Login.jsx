import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role) navigate(`/dashboard?role=${role}`);
  };

  return (
    <div style={{border:"1px solid", backgroundColor:"darkblue",  borderRadius:"10px",marginLeft:"720px",paddingLeft:"60px",paddingRight:"60px",paddingTop:"15px",paddingBottom:"80px"}}>
      <h1 style={{textAlign:"center",color:"white"}}>Login</h1>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="zamdekan">Zamdekan</option>
        <option value="oqtuvchi">O'qituvchi</option>
        <option value="raxbaryat">Rahbariyat</option>
        <option value="talaba">Talaba</option>
      </select>
      <button style={{backgroundColor:"green",color:"white",marginLeft:"20px"}} onClick={handleLogin}>Kirish</button>
    </div>
  );
};

export default Login;
