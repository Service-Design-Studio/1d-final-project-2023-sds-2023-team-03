import React, { useState } from 'react';
import CompetitorsInsightAccordion from './CompetitorsInsightsAccordions'


const CompetitorsInsights = ({ category, percentage, percent, averagePrice,compareCategory }) => {
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
    marginTop: '1em',
    marginBottom: '3em',
    boxShadow: '0 5px 5px rgba(0, 0, 0, 0)',
    borderRadius: '1em',
    backgroundColor: 'transparent',
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
      
      <div
        className="textBox salesInsights compInsights merchInsights"
        style={{ ...textBoxStyle, boxShadow: isProductSalesHovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleProductSalesMouseEnter}
        onMouseLeave={handleProductSalesMouseLeave}
      >
        <CompetitorsInsightAccordion />
        <br />
  
 

      </div>
    </div>
  );
};

export default CompetitorsInsights;
