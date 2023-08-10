import React, { useState } from 'react';
import CompetitorsInsightAccordion from './CompetitorsInsightsAccordions'

const CompetitorsInsights = () => {
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const allInsights = {
    // Example output
    Critical_Insight: [{ text: `You are doing better for the cat category.\n Your total sales: {sales}\n {competitor}’s total sales: {their_sales}` },
    { text: 'Item 2' },
    { text: 'Item 3' }],
    Severe_Insight: [],
    Moderate_Insight: [],
    Positive_Insight: [],
    Exceptional_Insight: [],
  };
  console.log("All insights: ", allInsights);

  return (
    <div style={containerStyle}>
      <div
        className="compInsights"
        style={{ ...textBoxStyle, boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CompetitorsInsightAccordion categorizedInsights={allInsights}/>
        <br />
      </div>
    </div>
  );
};

export default CompetitorsInsights;
