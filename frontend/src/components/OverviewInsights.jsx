import React, { useState } from 'react';

const OverviewInsights = ({ category, percentage, percent, averagePrice }) => {
  const [isCompetitionHovered, setIsCompetitionHovered] = useState(false);
  const [isProductSalesHovered, setIsProductSalesHovered] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const textBoxStyle = {
    display: 'inline-block',
    height: '20em',
    width: '90%', // Set a width proportional to the screen
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
          paddingBottom: '0.5em',
          marginBottom: '1em',
        }}
      >
        Insights
      </h2>
      <div
        className="textBox"
        style={{ ...textBoxStyle, boxShadow: isCompetitionHovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleCompetitionMouseEnter}
        onMouseLeave={handleCompetitionMouseLeave}
      >
        <p style={firstParagraphStyle}>Competition</p>
        <br />
        <div className='insightsText compInsights'>
          <span>Your {category} is {percentage} higher priced by {percent}. </span>
          <span>Well performing products are priced on average of {averagePrice}</span>
        </div>
      </div>
      <div
        className="textBox"
        style={{ ...textBoxStyle, boxShadow: isProductSalesHovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleProductSalesMouseEnter}
        onMouseLeave={handleProductSalesMouseLeave}
      >
        <p style={firstParagraphStyle}>Product Sales</p>
        <br />
        <span className='salesInsights'>Sales have [dropped/risen] by [percent] since [date]</span>
      </div>
    </div>
  );
};

export default OverviewInsights;
