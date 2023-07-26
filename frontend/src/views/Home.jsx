import React, { useState } from 'react';
import './Home.css';
import Grouping from '../components/Grouping';
import Column from '../components/Column';
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
const API_BASE_URL = 'http://127.0.0.1:3000/api/v1';
const [isLoading, setIsLoading] = useState(true); // Add isLoading state variable and set it to true initially



useEffect(() => {
  handleClick()
}, [])
  const [lastPressedDateTime, setLastPressedDateTime] = useState('');
  const [topProductData, setTopProductData] = useState({
    topProductData: {}
  })
  const [topCategoriesData, settopCategoriesData] = useState({
    topCategoriesData: {}
  })

  const [lowStocksData, setLowStocksData] = useState({
    frequencies: {}
  })
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [compareCategoryData, setCompareCategoryData] = useState(null);

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
    const lowStocksPromise = queryLowStocks('Comfortwear', thirtyDaysAgoDate, currentDate);
    const topCategoryPromise = queryTopCategory(thirtyDaysAgoDate, currentDate);
    
    // Create a Promise that resolves after 2 seconds
    const minWaitPromise = new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Create a Promise that resolves after 20 seconds
    const maxWaitPromise = new Promise((resolve) => setTimeout(resolve, 20000));
  
    // Use Promise.race to set an upper bound of 20 seconds
    try {
      const [queryData] = await Promise.all([
        Promise.all([topProductPromise, lowStocksPromise,topCategoryPromise]),
        Promise.race([minWaitPromise, maxWaitPromise]),
      ]);
    
  
      setTopProductData(queryData[0]);
      setLowStocksData(queryData[1]);
      settopCategoriesData(queryData[2])
   

      setIsDataLoaded(true);
      setIsLoading(false); // Set isLoading to false to indicate that data loading is complete
      const resolvedCompareCategory = await extractCategoryData(queryData[2]);
      setCompareCategoryData(resolvedCompareCategory);

    } catch (error) {
      // Handle the error if data retrieval fails within 20 seconds
      console.error('Error occurred during API request:', error);
    }
  
    setIsRefreshing(false);
  }

  async function getFilteredProductPrices(productNames) {
    try {
      // Fetch all products from the API
      const allProductsResponse = await axios.get(`${API_BASE_URL}/products/all`, { timeout: 2000 });
    
      if (Array.isArray(allProductsResponse.data)) {
        // Filter the products based on the product names in the input array
        const filteredProducts = allProductsResponse.data.filter((product) =>
          productNames.includes(product.product_name)
        );

  
        // Extract and return the price data for the filtered products
        const prices = filteredProducts.map((product) => product.price);
        console.log('Filtered Products Price:', prices);

        return prices;
      } else {
        // Handle the case where the API response is not an array
        console.error('API response is not an array:', allProductsResponse.data);
        return [];
      }
    } catch (error) {
      console.error('Error occurred during API request:', error);
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
          frequencies: {}
      }
    }
    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
  }

  async function queryTopCategory( start, end) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/sales/top_categories?start=${start}&end=${end}`,
        { timeout: 2000 }
      );
      if (response.data) {
        console.log('Top Cat:', response.data);
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
        `${API_BASE_URL}/products?low=true`,
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

  async function extractCategoryData(data) {
    const categories = Object.keys(data.amount);
    let highCategory = '';
    let lowCategory = '';
    let highCategoryRev = 0;
    let lowCategoryRev = Number.MAX_VALUE;
    let highCategoryUnit = 0;
    let lowCategoryUnit = Number.MAX_VALUE;
  
    categories.forEach((category) => {
      const categoryRev = data.amount[category];
      const categoryUnit = data.units[category];
  
      if (categoryRev > highCategoryRev) {
        highCategory = category;
        highCategoryRev = categoryRev;
      }
  
      if (categoryRev < lowCategoryRev) {
        lowCategory = category;
        lowCategoryRev = categoryRev;
      }
  
      highCategoryUnit = Math.max(highCategoryUnit, categoryUnit);
      lowCategoryUnit = Math.min(lowCategoryUnit, categoryUnit);
    });
  
    const result = {
      highCategory,
      lowCategory,
      highCategoryRev,
      lowCategoryRev,
      highCategoryUnit,
      lowCategoryUnit,
    };
  
    console.log('Extracted Category Data:', result);
    return result;
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
      {isLoading && (
        <div className="loader-overlay">
          <Loader size="xl" />
        </div>
      )}
      
      {isDataLoaded && !isLoading && <Grouping 
      topProductData=
      {{
        category: topProductData.types.revenue.x_axis,
        title:  topProductData.frequencies.x_axis,
        sales: topProductData.frequencies.y_axis,
        yearrev: topProductData.revenues.y_axis,
        price: getFilteredProductPrices(topProductData.frequencies.x_axis)
        
      }} />}
      
    {isDataLoaded && !isLoading &&
      <Insights
        category="Example Category" // Replace with the actual category value
        percentage={42} // Replace with the actual percentage value
        percent={15} // Replace with the actual percent value
        averagePrice="$100" // Replace with the actual average price value
        compareCategory={compareCategoryData}

      />
    }
      
      <div>
        <br></br>
        {isDataLoaded && !isLoading &&
        
        
        <Column lowStocksData={{lowStocksData}} />}
      </div>


    </div>
    
  );
}

export default Home;