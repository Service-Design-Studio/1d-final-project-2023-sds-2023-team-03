import { Accordion, Text, Group, Paper } from '@mantine/core';
import { VscWarning } from 'react-icons/vsc';
import { FiThumbsDown,FiThumbsUp} from 'react-icons/fi'
import {RiEmotionNormalLine} from 'react-icons/ri'
import {LuPartyPopper} from "react-icons/lu"
import AccordionList from './InsightAccordionList';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CompetitorsInsightAccordions() {
  const [category, setCategory] = useState(null);

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
        setCategory(data.category);
      })
      .catch((error) => {
        // Handle API error
        console.error('Error occurred during category classification:', error);
      });
  }, []);

  const listItems = [
    // Example output
    { text: `You are doing better for the ${category} category.\n Your total sales: {sales}\n {competitor}’s total sales: {their_sales}` },
    { text: 'Item 2' },
    { text: 'Item 3', hoverText: 'This is the hover text for Item 3' }
  ];

  return (
    //<div style={{ paddingTop : '3em', paddingBottom: '2em', backgroundColor: 'inherit' }}>
    //<Paper sx={{ backgroundColor: 'white' }}>
      <Accordion variant="filled" chevronPosition="left" defaultValue="customization" >
        <Accordion.Item value="Critical">
            <Accordion.Control>
            <Group noWrap> 
            <VscWarning fontSize= "2.5em" color ='red'></VscWarning>

                <div>
                <Text weight={600}>Critical</Text>
                <Text size="sm" color = "red" weight={400}>
                    Urgent Attention Needed
                </Text>
                </div>
                </Group>
            </Accordion.Control>

            <Accordion.Panel >
                <div style = {{alignItems : 'left', paddingLeft: '2em'}}>
                    <AccordionList listItems={listItems} />
                </div>
            </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Severe">

          <Accordion.Control >
          <Group noWrap> 
            <FiThumbsDown fontSize= "2.5em" color ='orange'></FiThumbsDown>

              <div>
                <Text weight={600}>Severe</Text>
                <Text size="sm" color = "orange" weight={400}>
                  Significant Problems
                </Text>
              </div>
          </Group>
          </Accordion.Control>
          <Accordion.Panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Moderate">
          <Accordion.Control>
          <Group noWrap> 
              <RiEmotionNormalLine fontSize= "2.5em" color ='grey'></RiEmotionNormalLine>
              <div>
                <Text weight={600}>Moderate</Text>
                <Text size="sm" color = "grey" weight={400}>
                  Not Causing Issues
                </Text>
              </div>
          </Group>
          </Accordion.Control>
          <Accordion.Panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Positive">
          <Accordion.Control>
          <Group noWrap> 
              <FiThumbsUp fontSize= "2.5em" color ='teal'></FiThumbsUp>

              <div>
                <Text weight={600}>Positive</Text>
                <Text size="sm" color = "teal" weight={400}>
                  Satisfactory Progress
                </Text>
              </div>
          </Group>
          </Accordion.Control>
          <Accordion.Panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Exceptional">
          <Accordion.Control>
          <Group noWrap> 
              <LuPartyPopper fontSize= "2.5em" color = 'green'> </LuPartyPopper>
              <div>
                <Text weight={600}>Exceptional</Text>
                <Text size="sm" color = "green" weight={400}>
                  Excellent Performance
                </Text>
              </div>
          </Group>
          </Accordion.Control>
          <Accordion.Panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      //</Paper>
    //</div>
  );
}

export default CompetitorsInsightAccordions;
