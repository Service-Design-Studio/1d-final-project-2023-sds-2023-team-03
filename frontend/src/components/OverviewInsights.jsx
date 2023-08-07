import React, { useState } from 'react';
import InsightAccordion from './InsightAccordions'


const OverviewInsights = ({ insights }) => {
  const [isProductSalesHovered, setIsProductSalesHovered] = useState(false);
  console.log("Insights",insights);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  

  function categorizeInsights(insights) {
    const categorizedInsights = {
      Critical_Insight: [],
      Severe_Insight: [],
      Moderate_Insight: [],
      Positive_Insight: [],
      Exceptional_Insight: [],
    };
  
    insights.forEach((insight) => {
      if (insight && insight.severity && insight.severity.label) {
        const categorizedInsight = { text: insight.text }; // Create a new object with the 'text' property
        switch (insight.severity.label) {
          case 'Critical':
            categorizedInsights.Critical_Insight.push(categorizedInsight);
            break;
          case 'Severe':
            categorizedInsights.Severe_Insight.push(categorizedInsight);
            break;
          case 'Moderate':
            categorizedInsights.Moderate_Insight.push(categorizedInsight);
            break;
          case 'Positive':
            categorizedInsights.Positive_Insight.push(categorizedInsight);
            break;
          case 'Exceptional':
            categorizedInsights.Exceptional_Insight.push(categorizedInsight);
            break;
          default:
            break;
        }
      }
    });
  
    return categorizedInsights;
  }
  

  const categorizedInsights = categorizeInsights(insights);
  console.log("Categorised Insights", categorizedInsights)


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



  const handleInsightsMouseEnter = () => {
    setIsProductSalesHovered(true);
  };

  const handleInsightsMouseLeave = () => {
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
        onMouseEnter={handleInsightsMouseEnter}
        onMouseLeave={handleInsightsMouseLeave}
      >
        <div style ={{paddingLeft :'2em', paddingRight:'2em'}}>
          <InsightAccordion 
          categorizedInsights = 
          {categorizedInsights}
          
          />
       </div>

        <br />
  
 

      </div>
    </div>
  );
};

export default OverviewInsights;
