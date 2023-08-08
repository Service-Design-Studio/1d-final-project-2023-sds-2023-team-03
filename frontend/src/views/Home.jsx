import React, { useState } from 'react';
import './Home.css';
import Grouping from '../components/Grouping';
import { Button,Loader } from '@mantine/core';
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
const API_BASE_URL = 'https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1';
const [isLoading, setIsLoading] = useState(true); // Add isLoading state variable and set it to true initially



useEffect(() => {
  handleClick()
}, [])
  const [lastPressedDateTime, setLastPressedDateTime] = useState('');
  const [topProductData, setTopProductData] = useState({
    topProductData: {}
  })
  
  const [insightData, setInsightData] = useState({
    insightData: {}
  })
  
  const [ProductData, setProductData] = useState({
    productData: {}
  })
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  async function handleClick() {
    if (isRefreshing) {
      // If the refreshing process is already in progress, do nothing
      return;
    }
    setIsRefreshing(true);
    setIsLoading(true); // Set isLoading to true before starting the data retrieval process
    const currentDate = new Date().toISOString().slice(0, 10);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);
    const currentDateTime = new Date().toLocaleString();
    setLastPressedDateTime(currentDateTime);
  
    // Wrap the asynchronous operations in Promises
    const topProductPromise = queryTopProduct('Comfortwear', thirtyDaysAgoDate, currentDate);
    const productPromise = queryProducts();
    const insightPromise = queryInsights();

    // Create a Promise that resolves after 2 seconds
    const minWaitPromise = new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Create a Promise that resolves after 20 seconds
    const maxWaitPromise = new Promise((resolve) => setTimeout(resolve, 20000));
  
    // Use Promise.race to set an upper bound of 20 seconds
    try {
      const [queryData] = await Promise.all([
        Promise.all([topProductPromise, productPromise,insightPromise]),
        Promise.race([minWaitPromise, maxWaitPromise]),
      ]);
    
  
      setTopProductData(queryData[0]);
      setProductData(queryData[1]);
      setInsightData(queryData[2]);

      console.log("TopProductData",topProductData);
      console.log("Inisghtdata",insightData);

      setIsDataLoaded(true);
      setIsLoading(false); // Set isLoading to false to indicate that data loading is complete

    } catch (error) {
      // Handle the error if data retrieval fails within 20 seconds
      console.error('Error occurred during API request:', error);
      setIsDataLoaded(false);
    }
  
    setIsRefreshing(false);
  }

  function getFilteredProductPrices(productNames) {
    try {
      // Simulating asynchronous data retrieval
      // Replace this with actual asynchronous data retrieval from an API or database
      
  
      // Filter and extract prices for the matching product names
      const filteredPrices =  ProductData
        .filter((product) => productNames.includes(product.product_name))
        .map((product) => product.price);
      console.log("Filtered Prices",filteredPrices)
      return filteredPrices;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function getFilteredProductImage(productNames) {
    try {
      // Simulating asynchronous data retrieval
      // Replace this with actual asynchronous data retrieval from an API or database
      
  
      // Filter and extract prices for the matching product names
      const filteredPrices =  ProductData
        .filter((product) => productNames.includes(product.product_name))
        .map((product) => product.image_link);
      console.log("Filtered Image Link",filteredPrices)
      return filteredPrices;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function getFilteredProductCategory(productNames) {
    try {
      
  
      // Filter and extract prices for the matching product names
      const filteredPrices =  ProductData
        .filter((product) => productNames.includes(product.product_name))
        .map((product) => product.product_type);
      console.log("Filtered Cateogry",filteredPrices)
      return filteredPrices;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async function queryTopProduct(category, start, end) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/sales?category=${category}&start=${start}&end=${end}`,
        { timeout: 2000 }
      );
      if (response.data) {
        console.log(response.data)
        return response.data
      } else {
        return {
          frequencies: {
            types: {}
          }
      }
    }
    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
  }

  async function queryInsights() {
    try {
      console.log(API_BASE_URL+"/insights/global")
      const response = await axios.get(`${API_BASE_URL}/insights/global`, { timeout: 8000 });
      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        return {
          frequencies: {
            types: {}
          }
        };
      }
    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
  }


  

  async function queryProducts() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products`,
        { timeout: 2000 }
      );
      if (response.data) {
        return response.data
      } else {
        return {
          types: {}
        }
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
      style={{ backgroundColor: '#374259', color: 'white', marginBottom: '1em' }}
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
      {isLoading && (
        <div className="loader-overlay">
          <Loader size="xl" />
        </div>
      )}
      
      {isDataLoaded && !isLoading && <Grouping 
      topProductData=
      {{
        image: getFilteredProductImage(topProductData.frequencies.x_axis),
        category: getFilteredProductCategory(topProductData.frequencies.x_axis),
        title:  topProductData.frequencies.x_axis,
        sales: topProductData.frequencies.y_axis,
        yearrev: topProductData.revenues.y_axis,
        price: getFilteredProductPrices(topProductData.frequencies.x_axis)
        
      }} />}
    <div style={{ padding: '4em 0', borderBottom: '3px solid #ccc' }}>
    </div>

    {isDataLoaded && !isLoading &&
      
      <Insights
        insights = {insightData}

      />
    }
      
    </div>
    
  );
}

export default Home;