import React, { useState, useEffect, useRef } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal, Badge, MultiSelect, Flex, Button, Space, Switch } from '@mantine/core'
import './Merchandising.css';
import MerchandisingTable from '../components/merchandising_components/MerchandisingTable.jsx';
import axios from 'axios';

function Logistics() {
  const [data, setData] = useState([]);
  const [anomalyData, setAnomalyData] = useState({});
  const [tagFilterData, setTagFilterData] = useState({
    priorities: [],
    hideOthers: false
  });
  const [insightsLoad, setInsightsLoad] = useState(true);
  const [anomaliesLoad, setAnomaliesLoad] = useState(true);
  const [errorOpen, errorModalHandler] = useDisclosure(false);
  const isMounted = useRef(false);
  const threshold = 50;
  const pageSize = 50;

  function getMerchData() {
    setInsightsLoad(true)
    axios.get("https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/insights/products", {timeout: 60 * 1000})
    .then((res) => {
      if (res.data) {
        setData(res.data);
      }
      setInsightsLoad(false);
    })
    .catch((err) => {
      console.log(err);
      errorModalHandler.open();
      setInsightsLoad(false);
    })
  }

  function getAnomalyData() {
    setAnomaliesLoad(true)
    axios.get("https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/anomalies/detect_anomalies?contamination=0.05", {timeout: 60 * 1000})
    .then((res) => {
      console.log(res)
      if (res.data) {
        setAnomalyData(res.data)
      }
      setAnomaliesLoad(false)
    })
    .catch((err) => {
      console.log(err);
      errorModalHandler.open();
      setAnomaliesLoad(false);
    })
  }

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false }
  })

  useEffect(() => {
    getMerchData();
    getAnomalyData();
  }, [isMounted.current]);

  return (
    <>
      <h1 id="sales-title">Merchandising</h1> 
      <Flex gap="sm" align="center">
        <Button onClick={getMerchData} loading={anomaliesLoad || insightsLoad} size="xs" variant="outline">Refresh</Button>
        <MultiSelect
          data = {[
            { value: 'popular', label: (<Badge color='green'>Popular!</Badge>) },
            { value: 'popular_low_stock', label: (<Badge color ='red'>Restock?</Badge>) },
            { value: 4, label: (<Badge variant="gradient" gradient={{ from:"red", to: "red" }}>CRITICAL!</Badge>)},
            { value: 'low', label: (<Badge variant="gradient" gradient={{from: 'yellow', to: 'black'}}>Anomalous: Low</Badge>)},
            { value: 'high', label: (<Badge variant="gradient" gradient={{from: 'green', to: 'black'}}>Anomalous: High</Badge>)}
          ]}
          clearable
          dropdownPosition='top'
          placeholder='Prioritize product tags'
          size='xs'
          onChange={(vals) => setTagFilterData({...tagFilterData, priorities: vals})}
        />
        <Switch
          label="Hide other products?"
          onChange={(e) => setTagFilterData({...tagFilterData, hideOthers: e.currentTarget.checked})}
        />
      </Flex>
      <Space h='xs'/>
      <MerchandisingTable data={data} anomalyData={anomalyData} threshold={threshold} pageSize={pageSize} apiLoad={anomaliesLoad || insightsLoad} tagFilterConfigs={tagFilterData}/>
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