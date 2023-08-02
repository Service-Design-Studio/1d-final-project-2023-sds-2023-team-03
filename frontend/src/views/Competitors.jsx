import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Stack, Modal, SegmentedControl, Button, Flex } from '@mantine/core'
import CarouselCard from '../components/CarouselCard';
import CompetitorsTable from '../components/CompetitorsTable';
import './Competitors.css'

const Competitors = () => {
  const isMounted = useRef(false);
  const [apiLoad, setApiLoad] = useState(true);
  const [errorOpen, setErrorOpen] = useState(false);
  const [segmentValue, setSegmentValue] = useState('pa')
  const [competitorProducts, setCompetitorProducts] = useState([]);
  const [topCompetitorSales, setTopCompetitorSales] = useState([]);
  const pageSize = 50;

  const { competitorName } = useParams();

  const getCompetitorsData = useCallback(() => {
    setApiLoad(true)
    axios.get(`https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/competitorss/${competitorName}`, {timeout: 10000})
    .then((res) => {
      if (res.data.all_data) setCompetitorProducts(res.data.all_data);
      if (res.data.top_sales) setTopCompetitorSales(res.data.top_sales);
      setApiLoad(false);
    })
    .catch((err) => {
      console.log(err);
      setErrorOpen(true);
      setApiLoad(false);
    })
  }, [competitorName]);


  useEffect(() => {
    if (segmentValue === 'pa') {
      getCompetitorsData()
    }

  }, [segmentValue, competitorName, getCompetitorsData]);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false };
  });

  useEffect(() => {
    getCompetitorsData();
  }, [isMounted.current]);

  return(
      <>
          <Stack>
          <h1 id="competitors-title">{competitorName}'s Analytics</h1>
          <CarouselCard topProducts={topCompetitorSales} />

          <div className="table-container">
            <Flex gap="sm" align="center">
              <SegmentedControl
                color="blue"
                radius="lg"
                value={segmentValue}
                onChange={setSegmentValue}
                data={[
                  { label: 'Competitors', value: 'pa' },
                  { label: 'Insights', value: 'i' }
                ]}
              />
              <Button onClick={getCompetitorsData} loading={apiLoad} size="xs" variant="outline">Refresh</Button>
            </Flex>
            {segmentValue === 'pa' ? <CompetitorsTable data={competitorProducts} pageSize={pageSize} apiLoad={apiLoad} /> : null}
          </div>

          <Modal
            centered
            opened={errorOpen}
            onClose={() => setErrorOpen(false)}
            title="Error"
            >
              There was a problem with loading the data. Please rety from the Competitors page.
            </Modal>
          </Stack>
      </>
  )
}

export default Competitors;
