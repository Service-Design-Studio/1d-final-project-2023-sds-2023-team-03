import React, { useState } from 'react';
import Tabs from './OverviewTabsInsight'


const OverviewInsights = ({ category, percentage, percent, averagePrice,compareCategory }) => {
  const [isCompetitionHovered, setIsCompetitionHovered] = useState(false);
  const [isProductSalesHovered, setIsProductSalesHovered] = useState(false);
  console.log('compareCategory:', compareCategory); // Add this line to check the content of compareCategory

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const textBoxStyle = {
    display: 'inline-block',
    width: '90%', // Set a width proportional to the screen
    marginBottom: '3em',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
    borderRadius: '1em',
    backgroundColor: '#9BABB8',
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

  const handleCompetitionMouseEnter = () => {
    setIsCompetitionHovered(true);
  };

  const handleCompetitionMouseLeave = () => {
    setIsCompetitionHovered(false);
  };

  const handleProductSalesMouseEnter = () => {
    setIsProductSalesHovered(true);
  };

  const handleProductSalesMouseLeave = () => {
    setIsProductSalesHovered(false);
  };

  return (
    <div style={containerStyle}>
      <h2
        className="insights-heading"
        style={{
          fontSize: '2em',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '1em',
          paddingTop: '2em',
        }}
      >
        Insights
      </h2>
      <div
        className="textBox salesInsights compInsights merchInsights"
        style={{ ...textBoxStyle, boxShadow: isProductSalesHovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleProductSalesMouseEnter}
        onMouseLeave={handleProductSalesMouseLeave}
      >
        <Tabs>
      </Tabs> 
        <br />
  
 

      </div>
    </div>
  );
};

export default OverviewInsights;
