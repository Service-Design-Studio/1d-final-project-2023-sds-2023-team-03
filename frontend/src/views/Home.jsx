import React, { useState } from 'react';
import './Home.css';
import Grouping from '../components/Grouping';
import Column from '../components/Column';
import { Button } from '@mantine/core';
import axios from 'axios';



function Home() {

  const [topProductData, setTopProductData] = useState({
    frequencies: {}
  })
  const [lowStocksData, setLowStocksData] = useState({
    frequencies: {}
  })
  console.log((lowStocksData[0]))
  async function handleClick() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);

    setTopProductData(await queryTopProduct('Comfortwear', thirtyDaysAgoDate, currentDate));
    setLowStocksData(await queryLowStocks('Comfortwear', thirtyDaysAgoDate, currentDate));

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
      </div>
      <h2>Top Products</h2>
      <Grouping topProductData = {topProductData}></Grouping>
      
      <h2 id="sales-title">
        <center>Insights</center>
      </h2>

      <div>
        <br></br>
        <Column lowStocksData = {lowStocksData}></Column>
      </div>


    </div>
    
  );
}

export default Home;