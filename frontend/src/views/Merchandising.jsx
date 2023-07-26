import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal, SegmentedControl, Flex, Button } from '@mantine/core'
import './Merchandising.css';
import MerchandisingTable from '../components/MerchandisingTable.jsx';
import MerchandisingInsights from '../components/MerchandisingInsights';
import axios from 'axios';

function Logistics() {
  const [data, setData] = useState([]);
  const [segmentValue, setSegmentValue] = useState('pa')
  const [apiLoad, setApiLoad] = useState(true);
  const [errorOpen, errorModalHandler] = useDisclosure(false);
  const threshold = 50;
  const pageSize = 50;

  const [mostStocksData, setMostStocksData] = useState(0);
  const [needsRestock, setNeedsRestock] = useState(0);
  const [above100Sold, setAbove100Sold] = useState(0);
  const [restockAbove100Sold, setRestockAbove100Sold] = useState(0);

  function getMerchData() {
    setApiLoad(true)
    axios.get("http://127.0.0.1:3000/api/v1/products/all", {timeout: 10000})
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
    if (segmentValue === 'pa') {
      getMerchData()
    }
    else {
      getInsightsData()
    }
  }, [segmentValue])

  function getInsightsData() {
    setApiLoad(true)
    axios.get("http://127.0.0.1:3000/api/v1/sales?low=true", {timeout: 10000})
    .then((res) => {
      if (res && res.data.length !== null) {
        setNeedsRestock(res.data.length);
      }
      setApiLoad(false);
    })
    .catch((err) => {
      console.log(err);
      errorModalHandler.open()
      setApiLoad(false);
    })
  }
  
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
      {segmentValue === 'pa' ? <MerchandisingTable data={data} threshold={threshold} pageSize={pageSize} apiLoad={apiLoad}/> : 
      <MerchandisingInsights product_name="Running Shoes" most_stocks_left={770} needs_restocking={needsRestock} above_100_sold={50} restock_above_100_sold={5} /> }
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