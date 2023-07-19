import React, { useState } from 'react';
import './Home.css';
import Grouping from '../components/Grouping';
import Column from '../components/Column';
import { Button } from '@mantine/core';
import axios from 'axios';
import { useEffect } from 'react';



function Home() {

useEffect(() => {
  handleClick()
}, [])
  const [lastPressedDateTime, setLastPressedDateTime] = useState('');
  const [topProductData, setTopProductData] = useState({
    topProductData: {}
  })
  const [lowStocksData, setLowStocksData] = useState({
    frequencies: {}
  })
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  async function handleClick() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);
    const currentDateTime = new Date().toLocaleString();
    setLastPressedDateTime(currentDateTime);
    setTopProductData(await queryTopProduct('Comfortwear', thirtyDaysAgoDate, currentDate));
    setLowStocksData(await queryLowStocks('Comfortwear', thirtyDaysAgoDate, currentDate));
    setIsDataLoaded(true);
    console.log((lowStocksData))

  }



  async function queryTopProduct(category, start, end) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/sales?category=${category}&start=${start}&end=${end}`,
        { timeout: 2000 }
      );
      if (response.data) {
        return response.data
      } else {
        return {
          frequencies: {}
      }
    }
    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
  }

  async function queryLowStocks(category, start, end) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/products?low=true`,
        { timeout: 2000 }
      );
      if (response.data) {
        return response.data
      } else {
        return {}
      }
    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
  }

  return (
    <div>
      <head>
        <link rel="stylesheet" href="Home.css" />
      </head>

      <h1 id="sales-title">Overview</h1>
      <div class="container">
        <Button class="top-right-button" onClick={handleClick}>
          Refresh Data
        </Button>
        <p class = "top-right">Last Refreshed: {lastPressedDateTime}</p>
      </div>
      <h2>Top Products</h2>
      {isDataLoaded && <Grouping topProductData={topProductData} />}
      
      <h2 className="insights-heading">
        Insights
      </h2>

      <div>
        <br></br>
        {isDataLoaded && <Column lowStocksData={{lowStocksData}} />}
      </div>


    </div>
    
  );
}

export default Home;