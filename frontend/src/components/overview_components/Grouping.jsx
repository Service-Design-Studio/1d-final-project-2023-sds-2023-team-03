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
      {topProductData.image[0]&&
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
      }
     
      {topProductData.image[1]&&
                <CardWidth 
                className = 'topProduct2'

                  imageUrl={topProductData.image[1]}                
                category = {topProductData.category[1]}
                 title = {topProductData.title[1]}
                 price= {topProductData.price[1]}
                 sales= {topProductData.sales[1]}
                 mthrev= {topProductData.price[1]*topProductData.sales[1]}
                 yearrev= {topProductData.yearrev[1]}

                  ></CardWidth>}
      {topProductData.image[2]&&
                <CardWidth 
                  imageUrl={topProductData.image[2]}                
                  className = 'topProduct3'
                 category = {topProductData.category[2]}
                  title = {topProductData.title[2]}
                  price= {topProductData.price[2]}
                  sales= {topProductData.sales[2]}
                  mthrev= {topProductData.sales[2]*topProductData.price[2]}
                  yearrev= {topProductData.yearrev[2]}

                  ></CardWidth>
      }
    </Group>
    </div>
  );
}

export default Grouping;