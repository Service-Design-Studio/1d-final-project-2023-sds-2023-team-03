import React, { useState } from 'react';

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
    height: '20em',
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
        className="textBox"
        style={{ ...textBoxStyle, boxShadow: isCompetitionHovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleCompetitionMouseEnter}
        onMouseLeave={handleCompetitionMouseLeave}
      >
        <p style={firstParagraphStyle}>Competition</p>
        <br />
        <div className='insightsText compInsights'>
          <span style={{ display: 'block' }}>Your {category} is {percentage} % higher priced by {percent}. </span>
          <span style={{ display: 'block' }}>Well performing products are priced on average of {averagePrice}</span>
         
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
        <div className="salesInsights" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
{/* <span style={{ display: 'block' }}>Sales have [dropped/risen] by [percent] since [date]</span> */}
<span style={{ display: 'block' }}>
    The highest revenue category is {compareCategory.highCategory} with revenue of {parseFloat(compareCategory.highCategoryRev).toFixed(2)} and unit sales of {compareCategory.highCategoryUnit}.
  </span>
  <span style={{ display: 'block' }}>
    The lowest revenue category is {compareCategory.lowCategory} with revenue of {parseFloat(compareCategory.lowCategoryRev).toFixed(2)} and unit sales of {compareCategory.lowCategoryUnit}.
  </span>
</div>

      </div>
      <div
        className="textBox"
        style={{ ...textBoxStyle, boxShadow: isProductSalesHovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleProductSalesMouseEnter}
        onMouseLeave={handleProductSalesMouseLeave}
      >
        <p style={firstParagraphStyle}>Product Actions</p>
        <br />
        <div className="merchInsights" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
{/* <span style={{ display: 'block' }}>Sales have [dropped/risen] by [percent] since [date]</span> */}

</div>

      </div>
    </div>
  );
};

export default OverviewInsights;
