import { Accordion, Text, Group } from '@mantine/core';
import { VscWarning } from 'react-icons/vsc';
import { FiThumbsDown,FiThumbsUp} from 'react-icons/fi'
import {RiEmotionNormalLine} from 'react-icons/ri'
import {LuPartyPopper} from "react-icons/lu"
import AccordionList from './InsightAccordionList';

function CompetitorsInsightAccordions({ categorizedInsights }) {
  let disableBoolC = categorizedInsights.Critical_Insight.length>0 ?
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
    :
    <Accordion.Control disabled>
      <Group noWrap> 
        <VscWarning fontSize= "2.5em" color ='red'></VscWarning>;
        <div>
        <Text weight={600}>Critical</Text>
        <Text size="sm" color = "red" weight={400}>
            Urgent Attention Needed
        </Text>
        </div>
      </Group>
    </Accordion.Control>;

  let disableBoolS = categorizedInsights.Severe_Insight.length>0 ?
    <Accordion.Control>
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
    :
    <Accordion.Control disabled>
      <Group noWrap> 
        <FiThumbsDown fontSize= "2.5em" color ='orange'></FiThumbsDown>
        <div>
          <Text weight={600}>Severe</Text>
          <Text size="sm" color = "orange" weight={400}>
            Significant Problems
          </Text>
        </div>
      </Group>
    </Accordion.Control>;

  let disableBoolM = categorizedInsights.Moderate_Insight.length>0 ?
    <Accordion.Control> 
      <Group noWrap>
        <RiEmotionNormalLine fontSize="2.5em" color="black"></RiEmotionNormalLine>
        <div>
          <Text weight={600}>Moderate</Text>
          <Text size="sm" color="black" weight={400}>
            Not Causing Issues
          </Text>
        </div>
      </Group>
    </Accordion.Control>
    :
    <Accordion.Control disabled> 
      <Group noWrap>
        <RiEmotionNormalLine fontSize="2.5em" color="black"></RiEmotionNormalLine>
        <div>
          <Text weight={600}>Moderate</Text>
          <Text size="sm" color="black" weight={400}>
            Not Causing Issues
          </Text>
        </div>
      </Group>
    </Accordion.Control>;

  let disableBoolP = categorizedInsights.Positive_Insight.length>0 ?
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
    :
    <Accordion.Control disabled>
      <Group noWrap> 
        <FiThumbsUp fontSize= "2.5em" color ='teal'></FiThumbsUp>
        <div>
          <Text weight={600}>Positive</Text>
          <Text size="sm" color = "teal" weight={400}>
            Satisfactory Progress
          </Text>
        </div>
      </Group>
    </Accordion.Control>;

  let disableBoolE = categorizedInsights.Exceptional_Insight.length>0 ?
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
    :
    <Accordion.Control disabled>
      <Group noWrap> 
        <LuPartyPopper fontSize= "2.5em" color = 'green'> </LuPartyPopper>
        <div>
          <Text weight={600}>Exceptional</Text>
          <Text size="sm" color = "green" weight={400}>
            Excellent Performance
          </Text>
        </div>
      </Group>
    </Accordion.Control>;

  return (
      <Accordion variant="filled" chevronPosition="left" defaultValue="customization" >
          <Accordion.Item value="Critical">
            {disableBoolC}

            <Accordion.Panel >
                <div style = {{alignItems : 'left', paddingLeft: '2em'}}>
                    <AccordionList listItems={categorizedInsights.Critical_Insight} />
                </div>
            </Accordion.Panel>
          </Accordion.Item>
        
          <Accordion.Item value="Severe">
            {disableBoolS}
            
            <Accordion.Panel>
                <div style = {{alignItems : 'left', paddingLeft: '2em'}}>
                    <AccordionList listItems={categorizedInsights.Severe_Insight} />
                </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Moderate">
            {disableBoolM}

            <Accordion.Panel>
                <div style = {{alignItems : 'left', paddingLeft: '2em'}}>
                    <AccordionList listItems={categorizedInsights.Moderate_Insight} />
                </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Positive">
            {disableBoolP}

            <Accordion.Panel>
                <div style = {{alignItems : 'left', paddingLeft: '2em'}}>
                    <AccordionList listItems={categorizedInsights.Positive_Insight} />
                </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Exceptional">
            {disableBoolE}

            <Accordion.Panel>
                <div style = {{alignItems : 'left', paddingLeft: '2em'}}>
                    <AccordionList listItems={categorizedInsights.Exceptional_Insight} />
                </div>
            </Accordion.Panel>
          </Accordion.Item>
      </Accordion>
  );
}

export default CompetitorsInsightAccordions;
