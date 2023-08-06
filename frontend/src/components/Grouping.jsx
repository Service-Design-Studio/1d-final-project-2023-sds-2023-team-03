import {Group} from '@mantine/core';
import CardWidth from './CardWidth';

function Grouping({topProductData}) {
  console.log("Grouping Product Data",topProductData)
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center', // Center the contents horizontally
    padding: '0 1em', // Add left and right padding
  };

  // Add the following styles to evenly space out the cards
  const groupStyles = {
    display: 'flex',
    justifyContent: 'space-between', // Evenly space out the items
    width: 'calc(100% - 10em)', /* Subtracting left and right padding from the width */
  };

  return (
    <div style={containerStyles}>
      <Group style={groupStyles}>
      <CardWidth 
                  className = 'topProduct1'

                  imageUrl={topProductData.image[0]}
                  category = {topProductData.category[0]}
                  title = {topProductData.title[0]}
                  price= {topProductData.price[0]}
                  sales= {topProductData.sales[0]}
                  mthrev= {topProductData.price[0]*topProductData.sales[0]}
                  yearrev= {topProductData.yearrev[0]}
                  
                  ></CardWidth>

      <CardWidth 
                className = 'topProduct2'

                  imageUrl={topProductData.image[1]}                
                category = {topProductData.category[1]}
                 title = {topProductData.title[1]}
                 price= {topProductData.price[1]}
                 sales= {topProductData.sales[1]}
                 mthrev= {topProductData.price[1]*topProductData.sales[1]}
                 yearrev= {topProductData.yearrev[1]}

                  ></CardWidth>

      <CardWidth 
                  imageUrl="data:image/jpeg;base64,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"
                  className = 'topProduct3'
                 category = {topProductData.category[2]}
                  title = {topProductData.title[2]}
                  price= {topProductData.price[2]}
                  sales= {topProductData.sales[2]}
                  mthrev= {topProductData.sales[2]*topProductData.price[2]}
                  yearrev= {topProductData.yearrev[2]}

                  ></CardWidth>
    </Group>
    </div>
  );
}

export default Grouping;