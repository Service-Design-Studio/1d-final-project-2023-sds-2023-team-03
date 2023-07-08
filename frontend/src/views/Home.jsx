import React from 'react';
import './Home.css';
import CardWithStats from '../components/CardWithStats';

function Home() {
  return (
    <div>
      <head>
        <link rel="stylesheet" href="Home.css" />
      </head>
      

      <h1 id="sales-title">Overview</h1>
      <h2>Top Products</h2>
      
      <div> {/* Product images*/}

      <img src="https://down-sg.img.susercontent.com/file/sg-11134201-22100-pzdbjnan7wiv42" alt="Product image" class="resized-image" ></img>
      <img src="https://down-sg.img.susercontent.com/file/sg-11134201-7qvcs-lh65gsgv6c5obe" alt="Product image" class="resized-image" ></img>
      
        <div> {/* Product info*/}

        <span class="textBox">
        <p>Price: $89</p>
        <p>Sales: 7</p>
        </span>

        <span class="textBox">
        <p>Price: $72</p>
        <p>Sales: 72</p>
       </span>  

        <span class="textBox">
        <p>Price: $55</p>
        <p>Sales: 102</p>
        </span>

        </div>
      </div>
        <div>
        
        </div> 
    </div>
  );
}

export default Home;