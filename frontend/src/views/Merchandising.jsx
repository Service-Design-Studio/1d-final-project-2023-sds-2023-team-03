import React, { useState, useEffect, useRef } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal, SegmentedControl, Flex, Button } from '@mantine/core'
import './Merchandising.css';
import MerchandisingTable from '../components/MerchandisingTable.jsx';
import axios from 'axios';

function Logistics() {
  const [data, setData] = useState([]);
  const [segmentValue, setSegmentValue] = useState('pa')
  const [apiLoad, setApiLoad] = useState(true);
  const [errorOpen, errorModalHandler] = useDisclosure(false);
  const isMounted = useRef(false);
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
      errorModalHandler.open()
      setApiLoad(false);
    })
  }

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false }
  })

  useEffect(() => {
    if (segmentValue === 'pa') {
      getMerchData()
    }
  }, [segmentValue])

  useEffect(() => {
    getMerchData();
  }, [isMounted.current]);
  
  return (
    <>
      <h1 id="sales-title">Merchandising</h1> 
      <Flex gap="sm" align="center">
        <SegmentedControl 
          color="blue"
          radius="lg"
          value={segmentValue}
          onChange={setSegmentValue}
          data={[
            { label: 'Product Actions', value: 'pa'},
            { label: 'Insights', value: 'i'}
          ]}
        />
        <Button onClick={getMerchData} loading={apiLoad} size="xs" variant="outline">Refresh</Button>
      </Flex>
      {segmentValue === 'pa' ? <MerchandisingTable data={data} threshold={threshold} pageSize={pageSize} apiLoad={apiLoad}/> : null}
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