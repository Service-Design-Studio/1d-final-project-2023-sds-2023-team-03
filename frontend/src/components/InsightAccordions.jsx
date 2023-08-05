import { Accordion, Text,Group } from '@mantine/core';
import { VscWarning } from 'react-icons/vsc';
import { FiThumbsDown,FiThumbsUp} from 'react-icons/fi'
import {RiEmotionNormalLine} from 'react-icons/ri'
import {LuPartyPopper} from "react-icons/lu"

function InsightAccordions() {
  return (
    <div style={{ paddingTop : '3em', paddingBottom: '2em' }}>
      <Accordion variant="separated" chevronPosition="left" defaultValue="customization">
        <Accordion.Item value="Critical">
          <Accordion.Control>
          <Group noWrap> 
          <VscWarning fontSize= "2.5em" color ='red'></VscWarning>

            <div>
              <Text weight={600}>Critical</Text>
              <Text size="sm" color="dimmed" color = "red" weight={400}>
                Urgent Attention Needed
              </Text>
            </div>
            </Group>
          </Accordion.Control>

          <Accordion.Panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Severe">

          <Accordion.Control >
          <Group noWrap> 
            <FiThumbsDown fontSize= "2.5em" color ='orange'></FiThumbsDown>

              <div>
                <Text weight={600}>Severe</Text>
                <Text size="sm" color="dimmed" color = "orange" weight={400}>
                  Significant Problems
                </Text>
              </div>
          </Group>
          </Accordion.Control>
          <Accordion.Panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Average">
          <Accordion.Control>
          <Group noWrap> 
              <RiEmotionNormalLine fontSize= "2.5em" color ='grey'></RiEmotionNormalLine>
              <div>
                <Text weight={600}>Average</Text>
                <Text size="sm" color="dimmed" color = "grey" weight={400}>
                  Not Causing Issues
                </Text>
              </div>
          </Group>
          </Accordion.Control>
          <Accordion.Panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Good">
          <Accordion.Control>
          <Group noWrap> 
              <FiThumbsUp fontSize= "2.5em" color ='teal'></FiThumbsUp>

              <div>
                <Text weight={600}>Good</Text>
                <Text size="sm" color="dimmed" color = "teal" weight={400}>
                  Satisfactory Progress
                </Text>
              </div>
          </Group>
          </Accordion.Control>
          <Accordion.Panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Very Good">
          <Accordion.Control>
          <Group noWrap> 
              <LuPartyPopper fontSize= "2.5em" color = 'green'> </LuPartyPopper>
              <div>
                <Text weight={600}>Very Good</Text>
                <Text size="sm" color="dimmed" color = "green" weight={400}>
                  Excellent Performance
                </Text>
              </div>
          </Group>
          </Accordion.Control>
          <Accordion.Panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default InsightAccordions;
