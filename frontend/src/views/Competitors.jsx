import { useEffect, useState } from 'react';
import './Competitors.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Stack, Space } from '@mantine/core'
import 'tailwindcss/tailwind.css';
import CarouselCard from '../components/CarouselCard';
import CompetitorsLineChart from '../components/CompetitorsLineChart'

const Competitors = () => {
  const { competitorName } = useParams();

  const [topCompetitorSales, setTopCompetitorSales] = useState([]);
  // const [allCompetitorData, setAllCompetitorData] = useState([]);
  const[competitorChartData, setCompetitorChartData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://127.0.0.1:3000/api/v1/competitors/${competitorName}`);
      // Process the data for the chart
      const competitorData = result.data.top_sales.map(item => {
        return {
          x: new Date(item.date).getTime(), // Convert date to timestamp for chart
          y: item.sales
        }
      });

      setTopCompetitorSales(result.data.top_sales);
      // setAllCompetitorData(result.data.all_data);
      setCompetitorChartData(competitorData);

    };

    fetchData();
  }, [competitorName]);

  return(
      <>
          <Stack>
          <h1 id="competitors-title">{competitorName}'s Analytics</h1>
          <CarouselCard topProducts={topCompetitorSales} />
          <CompetitorsLineChart competitorData={competitorChartData} />
          </Stack>
      </>
  )
}

export default Competitors;
