import React from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <head>
        <link rel="stylesheet" href="Home.css" />
      </head>
      

      <h1 id="sales-title">Overview</h1>
      <h2>Top Products</h2>
      
      <div> {/* Product images*/}
      <img src="https://down-sg.img.susercontent.com/file/sg-11134201-22100-ars1owan7wiv45" alt="Product image" class="resized-image" ></img>
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
        <br></br>  
        <span class="box">Product Actions: [Product Name] is running low. Supply will last for about a month. Restocking is needed</span>
        <span class="box">Competition: Your [category] is [percentage] higher priced by [percent]. Well performing products are price on average of [price]</span>
        <span class="box">Sales: Your top sales is [product] with [number] and your lowest [sale] is [number]</span>

        </div> 
    </div>
  );
}

export default Home;