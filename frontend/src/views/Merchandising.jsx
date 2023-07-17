import React from 'react';
import './Merchandising.css';
import MerchandisingTable from '../components/MerchandisingTable.jsx'

const data = 
{
  low: [
    {
      product_name: 'test1',
      stock: 9,
      last_resupplied: 'yday'
    },
    {
      product_name: 'test2',
      stock: 2,
      last_resupplied: 'tmrw'
    },
    {
      product_name: 'test3',
      stock: 0,
      last_resupplied: 'afternoon'
    },
    {
      product_name: 'high1',
      stock: 90,
      last_resupplied: 'yday'
    },
    {
      product_name: 'high2',
      stock: 200,
      last_resupplied: 'tmrw'
    },
    {
      product_name: 'high3',
      stock: 990,
      last_resupplied: 'afternoon'
    },
    {
      product_name: 'test2',
      stock: 2,
      last_resupplied: 'tmrw'
    }
  ]
}

function Logistics() {
  const threshold = 50;
  
  return (
    <div>
      <h1 id="sales-title">Merchandising</h1> 
      <MerchandisingTable data={data.low} threshold={threshold}/>
    </div>
  );
}

export default Logistics;