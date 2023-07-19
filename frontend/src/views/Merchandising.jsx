import React, { useState, useEffect } from 'react';
import './Merchandising.css';
import MerchandisingTable from '../components/MerchandisingTable.jsx';
import axios from 'axios';

function Logistics() {
  const [data, setData] = useState([]);
  const threshold = 50;
  const pageSize = 50;

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/products/all")
    .then((res) => {
      if (res) {
        setData(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])
  
  return (
    <div>
      <h1 id="sales-title">Merchandising</h1> 
      <MerchandisingTable data={data} threshold={threshold} pageSize={pageSize}/>
    </div>
  );
}

export default Logistics;