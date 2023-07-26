import React, { useState } from 'react';
import { Flex } from '@mantine/core';

const MerchandisingInsights = ({ product_name, most_stocks_left, needs_restocking, above_100_sold, restock_above_100_sold }) => {
  const [isInsight1Hovered, setIsInsight1Hovered] = useState(false);
  const [isInsight2Hovered, setIsInsight2Hovered] = useState(false);
  const [isInsight3Hovered, setIsInsight3Hovered] = useState(false);
  const [isInsight4Hovered, setIsInsight4Hovered] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const textBoxStyle = {
    display: 'inline-block',
    height: '14em',
    width: '40%', // Set a width proportional to the screen
    marginBottom: '5em',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
    borderRadius: '1em',
    backgroundColor: '#75B9BE',
    position: 'relative',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
  };

  const firstParagraphStyle = {
    fontSize: '1.4em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '10px',
  };

  const handleInsight1MouseEnter = () => {
    setIsInsight1Hovered(true);
  };

  const handleInsight1MouseLeave = () => {
    setIsInsight1Hovered(false);
  };

  const handleInsight2MouseEnter = () => {
    setIsInsight2Hovered(true);
  };

  const handleInsight2MouseLeave = () => {
    setIsInsight2Hovered(false);
  };

  const handleInsight3MouseEnter = () => {
    setIsInsight3Hovered(true);
  };

  const handleInsight3MouseLeave = () => {
    setIsInsight3Hovered(false);
  };

  const handleInsight4MouseEnter = () => {
    setIsInsight4Hovered(true);
  };

  const handleInsight4MouseLeave = () => {
    setIsInsight4Hovered(false);
  };

  return (
    <div className="merchInsights" style={containerStyle}>
      <h2
        className="insights-heading"
        style={{
          fontSize: '2em',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          paddingBottom: '0.5em',
          marginBottom: '1em',
        }}
      >
        Insights
      </h2>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'center' }}
        >
      <div
        className="textBox"
        style={{ ...textBoxStyle, backgroundColor: 'aquamarine', boxShadow: isInsight1Hovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleInsight1MouseEnter}
        onMouseLeave={handleInsight1MouseLeave}
      >
        <p style={firstParagraphStyle}>Most Stocks</p>
        <br />
        <div className='merchInsights_popularProducts'>
          <span>{product_name} has the most stocks left with: {most_stocks_left} stocks left.</span>
        </div>
      </div>

      <div
        className="textBox"
        style={{ ...textBoxStyle, backgroundColor: needs_restocking >= '20' ? 'crimson' : (needs_restocking <= 5 ? 'lime' : 'aquamarine'), boxShadow: isInsight2Hovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleInsight2MouseEnter}
        onMouseLeave={handleInsight2MouseLeave}
      >
        <p style={firstParagraphStyle}>Products Restocking</p>
        <br />
        <span className='merchInsights_restock'>{needs_restocking} products needs restocking.</span>
      </div>

      <div
        className="textBox"
        style={{ ...textBoxStyle, backgroundColor: above_100_sold >= '10' ? 'lime' : 'aquamarine', boxShadow: isInsight3Hovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleInsight3MouseEnter}
        onMouseLeave={handleInsight3MouseLeave}
      >
        <p style={firstParagraphStyle}>Products that are doing well</p>
        <br />
        <span className='merchInsights_above_100_sold'>{above_100_sold} products are doing well with more than 100 units sold within the last month.</span>
      </div>

      <div
        className="textBox"
        style={{ ...textBoxStyle, backgroundColor: restock_above_100_sold >= '5' ? 'crimson' : 'aquamarine', boxShadow: isInsight4Hovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleInsight4MouseEnter}
        onMouseLeave={handleInsight4MouseLeave}
      >
        <p style={firstParagraphStyle}>Restock: Products that are doing well</p>
        <br />
        <span className='merchInsights_above_100_sold'>{restock_above_100_sold} products who are doing well needs restocking.</span>
      </div>
      </Flex>

    </div>
  );
};

export default MerchandisingInsights;