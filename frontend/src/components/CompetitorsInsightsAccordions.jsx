import { Accordion, Text, Group, Paper } from '@mantine/core';
import { VscWarning } from 'react-icons/vsc';
import { FiThumbsDown,FiThumbsUp} from 'react-icons/fi'
import {RiEmotionNormalLine} from 'react-icons/ri'
import {LuPartyPopper} from "react-icons/lu"
import AccordionList from './InsightAccordionList';

function CompetitorsInsightAccordions() {
  const listItems = [
    { text: 'Item 1', hoverText: 'This is the hover text for Item 1' },
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
