import React, { useState, useEffect } from 'react';
import CompetitorsInsightAccordion from './CompetitorsInsightsAccordions'
import axios from 'axios';

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

  const [prodcategory, setprodCategory] = useState(null);

  useEffect(() => {
    // It has to be in the form --> Product Name: ${product_name} and Product Description: ${product_description}
    const ProdText = `Product Name: Skechers Men Transformers SKECHERS Street Stamina V3 Shoes - 802011-BKYL Air-Cooled Memory Foam Vegan
    Product Description: Description:
    
    Boost your style with a striking look Skechers Stamina V3. This vegan design features a lace-up synthetic and mesh upper with a cushioned Skechers Air-Cooled Memory Foam® insole.
  
    Features:
    
    - Part of the Skechers x Transformers collection
    
    - Colorways and design details inspired by characters in the blockbuster such as Bumblebee, Optimus Prime, Mirage, Optimus Primal and Arcee
    
    - Skechers Air-Cooled Memory Foam® cushioned comfort insole
    
    - Crafted with 100% vegan materials
    
    - Lace-up synthetic and mesh upper
    
    - Shock-absorbing cushioned midsole
    
    - Flexible traction outsole
    
    - Skechers® logo detail
    
    `;
  
    axios.post('http://127.0.0.1:3000/api/v1/classify-category', { text: ProdText })
      .then((response) => {
        const data = response.data;
        setprodCategory(data.category);
      })
      .catch((error) => {
        // Handle API error
        console.error('Error occurred during category classification:', error);
      });
  }, []);

  const allInsights = {
    // Example output
    Critical_Insight: [{ text: `You are doing better for the ${prodcategory} category.\n Your total sales: {sales}\n {competitor}’s total sales: {their_sales}` },
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
        className="textBox salesInsights compInsights merchInsights"
        style={{ ...textBoxStyle, boxShadow: isProductSalesHovered ? '0 10px 25px rgba(0, 0, 0, 0.3)' : textBoxStyle.boxShadow }}
        onMouseEnter={handleProductSalesMouseEnter}
        onMouseLeave={handleProductSalesMouseLeave}
      >
        <CompetitorsInsightAccordion categorizedInsights={allInsights}/>
        <br />
      </div>
    </div>
  );
};

export default CompetitorsInsights;
