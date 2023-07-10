import React from 'react';
import './Home.css';
import Grouping from '../components/Grouping';
import Column from '../components/Column';
import Refresh from '../components/Refresh';
import Tables from '../components/Tables';

function Home() {
  return (
    <div>
      <head>
        <link rel="stylesheet" href="Home.css" />
      </head>
  
      <h1 id="sales-title">Overview</h1>
      <h2>Top Products</h2>
      <Grouping></Grouping>
      <div>
        <br></br>
        <Column></Column>
      </div>

      <div>
        <br></br>
        <Refresh></Refresh>
      </div>

    </div>
  );
}

export default Home;