import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Stack, Modal, SegmentedControl, Button, Flex } from '@mantine/core'
import CarouselCard from '../components/CarouselCard';
import CompetitorsTable from '../components/CompetitorsTable';
import './Competitors.css'
import CompetitorsInsights from '../components/CompetitorsInsights';

const Competitors = () => {
  const isMounted = useRef(false);
  const [lazadaLoad, setLazadaLoad] = useState(true);
  const [shopeeLoad, setShopeeLoad] = useState(true);
  const [errorOpen, setErrorOpen] = useState(false);
  const [segmentValue, setSegmentValue] = useState('lazada')
  const [lazadaProducts, setLazadaProducts] = useState([]);
  const [shopeeProducts, setShopeeProducts] = useState([]);
  const [topCompetitorSales, setTopCompetitorSales] = useState([]);
  const pageSize = 50;

  const { competitorName } = useParams();

  const getLazadaData = () => {
    setLazadaLoad(true)
    let url = `https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/competitors/${competitorName.toLowerCase()}?merchant=lazada`;

    axios.get(url, {timeout: 60 * 1000})
    .then((res) => {
      if (res.data.all_data) setLazadaProducts(res.data.all_data);
      if (res.data.top_sales) setTopCompetitorSales(res.data.top_sales);
      setLazadaLoad(false);
    })
    .catch((err) => {
      console.log(err);
      setErrorOpen(true);
      setLazadaLoad(false);
    })
  };

  const getShopeeData = () => {
    setShopeeLoad(true)
    let url = `https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/competitors/${competitorName.toLowerCase()}?merchant=shopee`;

    axios.get(url, {timeout: 60 * 1000})
    .then((res) => {
      if (res.data.all_data) setShopeeProducts(res.data.all_data);
      if (res.data.top_sales) setTopCompetitorSales(res.data.top_sales);
      setShopeeLoad(false);
    })
    .catch((err) => {
      console.log(err);
      setErrorOpen(true);
      setShopeeLoad(false);
    })
  };

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false };
  });

  useEffect(() => {
    if (competitorName.toLowerCase() === 'nike') setSegmentValue('lazada');
    if (segmentValue === 'lazada') getLazadaData();
    if (segmentValue === 'shopee') getShopeeData();
  }, [isMounted.current, competitorName, segmentValue])

  return(
      <>
          <Stack>
          {competitorName.toLowerCase() === 'overall' ? <h1 id="competitors-title">{competitorName} Analytics</h1> : <h1 id="competitors-title">{competitorName}'s Analytics</h1> }

            <Flex gap="sm" align="center" justify="center">
              <SegmentedControl
                color="blue"
                radius="lg"
                value={segmentValue}
                onChange={setSegmentValue}
                data={[
                  { label: 'Lazada', value: 'lazada' },
                  { label: 'Shopee', value: 'shopee', disabled: competitorName.toLowerCase() === 'nike'}
                ]}
              />
              <Button onClick={segmentValue === 'lazada' ? getLazadaData : getShopeeData} loading={lazadaLoad || shopeeLoad} size="xs" variant="outline">Refresh</Button>
            </Flex>

          <CarouselCard topProducts={topCompetitorSales} />

          <div className="table-container">
            {segmentValue === 'insights' ? <CompetitorsInsights /> :
            <CompetitorsTable data={segmentValue === 'lazada' ? lazadaProducts : shopeeProducts} pageSize={pageSize} apiLoad={lazadaLoad || shopeeLoad} />}

          </div>

          <Modal
            centered
            opened={errorOpen}
            onClose={() => setErrorOpen(false)}
            title="Error"
            >
              There was a problem with loading the data. Please retry from the Competitors page.
            </Modal>
          </Stack>
      </>
  )
}

export default Competitors;
