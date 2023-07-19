import React, { useState, useEffect } from 'react';
import './Merchandising.css';
import MerchandisingTable from '../components/MerchandisingTable.jsx';
import axios from 'axios';

function Logistics() {
  const [data, setData] = useState([]);
  const [apiLoad, setApiLoad] = useState(true);
  const threshold = 50;
  const pageSize = 50;

  function getMerchData() {
    setApiLoad(true)
    axios.get("https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/products/all", {timeout: 10000})
    .then((res) => {
      if (res && res.data.length > 0) {
        setData(res.data);
      }
      setApiLoad(false);
    })
    .catch((err) => {
      console.log(err);
      setApiLoad(false);
    })
  }

  useEffect(() => {
    getMerchData()
  }, [])
  
  return (
    <div>
      <h1 id="sales-title">Merchandising</h1> 
      <MerchandisingTable data={data} threshold={threshold} pageSize={pageSize} apiLoad={apiLoad}/>
    </div>
  );
}

export default Logistics;

/* TODO
- error handler
- insights
- expandable row -> product details
*/