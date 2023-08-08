import React, { useState, useEffect, useRef } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal, Badge, MultiSelect, Flex, Button, Space, Switch } from '@mantine/core'
import './Merchandising.css';
import MerchandisingTable from '../components/merchandising_components/MerchandisingTable.jsx';
import axios from 'axios';

function Logistics() {
  const [data, setData] = useState([]);
  const [tagFilterData, setTagFilterData] = useState({
    priorities: [],
    hideOthers: false
  })
  const [apiLoad, setApiLoad] = useState(true);
  const [errorOpen, errorModalHandler] = useDisclosure(false);
  const isMounted = useRef(false);
  const threshold = 50;
  const pageSize = 50;

  function getMerchData() {
    setApiLoad(true)
    axios.get("https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/insights/products", {timeout: 10000})
    .then((res) => {
      if (res.data) {
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
    getMerchData();
  }, [isMounted.current]);

  return (
    <>
      <h1 id="sales-title">Merchandising</h1> 
      <Flex gap="sm" align="center">
        <Button onClick={getMerchData} loading={apiLoad} size="xs" variant="outline">Refresh</Button>
        <MultiSelect
          data = {[
            { value: 'popular', label: (<Badge color='green'>Popular!</Badge>) },
            { value: 'popular_low_stock', label: (<Badge color ='red'>Restock?</Badge>) },
            { value: 4, label: (<Badge variant="gradient" gradient={{ from:"red", to: "red" }}>CRITICAL!</Badge>)}
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
      <div>
        <MerchandisingTable data={data} threshold={threshold} pageSize={pageSize} apiLoad={apiLoad} tagFilterConfigs={tagFilterData}/>
      </div>
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