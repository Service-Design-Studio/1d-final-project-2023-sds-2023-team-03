import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal } from '@mantine/core'
import './Merchandising.css';
import MerchandisingTable from '../components/MerchandisingTable.jsx';
import axios from 'axios';

function Logistics() {
  const [data, setData] = useState([]);
  const [apiLoad, setApiLoad] = useState(true);
  const [errorOpen, errorModalHandler] = useDisclosure(false);
  const threshold = 50;
  const pageSize = 50;

  function getMerchData() {
    setApiLoad(true)
    axios.get("https://sds-team3-backdend-v4txkfic3a-as.a.run.app/api/v1/products/all", {timeout: 10000})
    .then((res) => {
      if (res && res.data.length > 0) {
        setData(res.data);
      }
      setApiLoad(false);
    })
    .catch((err) => {
      console.log(err);
      errorModalHandler.open()
      setApiLoad(false);
    })
  }

  useEffect(() => {
    getMerchData()
  }, [])
  
  return (
    <>
      <h1 id="sales-title">Merchandising</h1> 
      <MerchandisingTable data={data} threshold={threshold} pageSize={pageSize} apiLoad={apiLoad}/>
      <Modal
        centered
        opened={errorOpen}
        onClose={errorModalHandler.close}
        title="Error"
      > 
        There was a problem with loading the data. Please retry from the Merchandising page.
      </Modal>
    </>
  );
}

export default Logistics;

/* TODO
- error handler
- insights
- expandable row -> product details
*/