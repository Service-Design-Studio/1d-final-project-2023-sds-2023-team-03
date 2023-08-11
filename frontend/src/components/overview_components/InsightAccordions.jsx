import { Accordion, Text, Group } from '@mantine/core';
import { VscWarning } from 'react-icons/vsc';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { RiEmotionNormalLine } from 'react-icons/ri';
import { LuPartyPopper } from 'react-icons/lu';
import {BsInfoSquare} from 'react-icons/bs'
import AccordionList from './InsightAccordionList';

function InsightAccordions({ categorizedInsights }) {
  return (
    <div style={{ paddingTop: '3em', paddingBottom: '2em' }}>
      <Accordion variant="separated" chevronPosition="left" defaultValue="customization">
        
        
        {categorizedInsights.Critical_Insight.length>0  && (
          <Accordion.Item value="Critical">
            <Accordion.Control>
              <Group noWrap>
                <VscWarning fontSize="2.5em" color="red" />
                <div>
                  <Text weight={600}>Critical</Text>
                  <Text size="sm" color="red" weight={400}>
                    Urgent Attention Needed
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            
            <Accordion.Panel>
              <div style={{ alignItems: 'left', paddingLeft: '2em' }}>
                <AccordionList listItems={categorizedInsights.Critical_Insight} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        {/* Handle disabling when list is empty */}
        {categorizedInsights.Critical_Insight.length === 0 && (
          <Accordion.Item value="Critical">
            <Accordion.Control disabled> 
            <Group noWrap>
                <VscWarning fontSize="2.5em" color="black"></VscWarning>
                <div>
                  <Text weight={600}>Critical</Text>
                  <Text size="sm" color="black" weight={400}>
                    Urgent Attention Needed
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
          </Accordion.Item>
        )}


        {categorizedInsights.Severe_Insight.length >0 && (
          <Accordion.Item value="Severe">
            <Accordion.Control>
              <Group noWrap>
                <FiThumbsDown fontSize="2.5em" color="orange" />
                <div>
                  <Text weight={600}>Severe</Text>
                  <Text size="sm" color="orange" weight={400}>
                    Significant Problems
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <div style={{ alignItems: 'left', paddingLeft: '2em' }}>
                <AccordionList listItems={categorizedInsights.Severe_Insight} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        {/* Handle disabling when list is empty */}
        {categorizedInsights.Severe_Insight.length === 0 && (
                  <Accordion.Item value="Severe">
                    <Accordion.Control disabled> 
                    <Group noWrap>
                        <FiThumbsDown fontSize="2.5em" color="black"></FiThumbsDown>
                        <div>
                          <Text weight={600}>Severe</Text>
                          <Text size="sm" color="black" weight={400}>
                          Significant Problems
                          </Text>
                        </div>
                      </Group>
                    </Accordion.Control>
                  </Accordion.Item>
                )}

        {categorizedInsights.General_Insight.length >0 && (
          <Accordion.Item value="General">
            <Accordion.Control>
              <Group noWrap>
                <BsInfoSquare fontSize="2.5em" color="blue" />
                <div>
                  <Text weight={600}>General</Text>
                  <Text size="sm" color="blue" weight={400}>
                    Overall Information
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <div style={{ alignItems: 'left', paddingLeft: '2em' }}>
                <AccordionList listItems={categorizedInsights.General_Insight} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}

         {/* Handle disabling when list is empty */}
         {categorizedInsights.General_Insight.length === 0 && (
          <Accordion.Item value="General">
            <Accordion.Control disabled> 
            <Group noWrap>
                <BsInfoSquare fontSize="2.5em" color="black"></BsInfoSquare>
                <div>
                  <Text weight={600}>General</Text>
                  <Text size="sm" color="black" weight={400}>
                    Overall Information
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
          </Accordion.Item>
        )}

        {categorizedInsights.Positive_Insight.length >0  && (
          <Accordion.Item value="Positive">
            <Accordion.Control>
              <Group noWrap>
                <FiThumbsUp fontSize="2.5em" color="teal" />
                <div>
                  <Text weight={600}>Positive</Text>
                  <Text size="sm" color="teal" weight={400}>
                    Satisfactory Progress
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <div style={{ alignItems: 'left', paddingLeft: '2em' }}>
                <AccordionList listItems={categorizedInsights.Positive_Insight} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}

            {/* Handle disabling when list is empty */}
            {categorizedInsights.Positive_Insight.length === 0 && (
                      <Accordion.Item value="Positive">
                        <Accordion.Control disabled> 
                        <Group noWrap>
                            <FiThumbsUp fontSize="2.5em" color="black"></FiThumbsUp>
                            <div>
                              <Text weight={600}>Positive</Text>
                              <Text size="sm" color="black" weight={400}>
                              Satisfactory Progress
                              </Text>
                            </div>
                          </Group>
                        </Accordion.Control>
                      </Accordion.Item>
                    )}

        {categorizedInsights.Exceptional_Insight.length > 0 && (
          <Accordion.Item value="Exceptional">
            <Accordion.Control>
              <Group noWrap>
                <LuPartyPopper fontSize="2.5em" color="green"></LuPartyPopper>
                <div>
                  <Text weight={600}>Exceptional</Text>
                  <Text size="sm" color="green" weight={400}>
                    Excellent Performance
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <div style={{ alignItems: 'left', paddingLeft: '2em' }}>
                <AccordionList listItems={categorizedInsights.Exceptional_Insight} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}

      {/* Handle disabling when list is empty */}
        {categorizedInsights.Exceptional_Insight.length === 0 && (
          <Accordion.Item value="Exceptional">
            <Accordion.Control disabled> 
            <Group noWrap>
                <LuPartyPopper fontSize="2.5em" color="black"></LuPartyPopper>
                <div>
                  <Text weight={600}>Exceptional</Text>
                  <Text size="sm" color="black" weight={400}>
                    Excellent Performance
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
          </Accordion.Item>
        )}


      </Accordion>
    </div>
  );
}

export default InsightAccordions;
