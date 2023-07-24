import React, { useState } from 'react';
import './Home.css';
import Grouping from '../components/Grouping';
import Column from '../components/Column';
import { Button } from '@mantine/core';
import axios from 'axios';
import { useEffect } from 'react';
import {IoIosRefresh} from 'react-icons/io'
import Insights from '../components/OverviewInsights'; // Import the Insights component


const headingStyle = {
  fontSize: '2em', // Equivalent to 24px for most browsers
  fontWeight: 'bold',
  color: '#333',
  textTransform: 'uppercase',
  paddingBottom: '0.5em', // Equivalent to 10px for most browsers
  marginBottom: '1em', // Equivalent to 20px for most browsers
};


function Home() {

const [isRefreshing, setIsRefreshing] = useState(false);



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
    if (isRefreshing) {
      // If the refreshing process is already in progress, do nothing
      return;
    }
    setIsRefreshing(true);
    const currentDate = new Date().toISOString().slice(0, 10);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);
    const currentDateTime = new Date().toLocaleString();
    setLastPressedDateTime(currentDateTime);
  
    // Wrap the asynchronous operations in Promises
    const topProductPromise = queryTopProduct('Comfortwear', thirtyDaysAgoDate, currentDate);
    const lowStocksPromise = queryLowStocks('Comfortwear', thirtyDaysAgoDate, currentDate);
  
    // Create a Promise that resolves after 2 seconds
    const minWaitPromise = new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Create a Promise that resolves after 20 seconds
    const maxWaitPromise = new Promise((resolve) => setTimeout(resolve, 20000));
  
    // Use Promise.race to set an upper bound of 20 seconds
    try {
      const [topProductData, lowStocksData] = await Promise.all([
        Promise.all([topProductPromise, lowStocksPromise]),
        Promise.race([minWaitPromise, maxWaitPromise]),
      ]);
  
      setTopProductData(topProductData[0]);
      setLowStocksData(topProductData[1]);
      setIsDataLoaded(true);
    } catch (error) {
      // Handle the error if data retrieval fails within 20 seconds
      console.error('Error occurred during API request:', error);
    }
  
    setIsRefreshing(false);
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


  <div style={{ display: 'flex', alignItems: 'center' }}>
  <h1 id="sales-title" style={{ marginRight: 'auto', marginBottom: 0 }}>Overview</h1>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight:'3em', paddingTop:'2em'}}>
  <Button
      className="top-right-button"
      onClick={handleClick}
      disabled={isRefreshing} // Disable the button when refreshing is in progress
      style={{ backgroundColor: 'rgb(8 51 68)', color: 'white', marginBottom: '1em' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <IoIosRefresh
          style={{
            marginRight: '0.5em',
            animation: isRefreshing ? 'rotate 2s linear infinite' : 'none',
          }}
        />        Refresh
      </div>
    </Button>
    
    <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
    <p style={{ margin: 0 ,fontSize :'0.9em'}}>Last Refreshed:</p>
    <p className = 'refreshTime' style={{ margin: 0 ,fontSize :'0.9em'}}>{lastPressedDateTime}</p>
    </div>  
    </div>
</div>
      <h2 style={headingStyle}>Top Products</h2>
      {isDataLoaded && <Grouping 
      topProductData={topProductData} />}
      
    
      <Insights
        category="Example Category" // Replace with the actual category value
        percentage={42} // Replace with the actual percentage value
        percent={15} // Replace with the actual percent value
        averagePrice="$100" // Replace with the actual average price value
      />
      
      <div>
        <br></br>
        {isDataLoaded && 
        
        
        <Column lowStocksData={{lowStocksData}} />}
      </div>


    </div>
    
  );
}

export default Home;