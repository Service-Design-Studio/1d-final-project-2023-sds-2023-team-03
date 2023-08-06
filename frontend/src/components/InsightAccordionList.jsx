import { List, ThemeIcon, HoverCard, Text } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed,IconArrowBadgeRight } from '@tabler/icons-react';
import * as React from 'react';

function AccordionList({ listItems }) {
  return (
    <div style={{ textAlign: 'left' }}> 
    <List spacing="xs" size="sm" > {/* Add align="left" here */}
      {listItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.hoverText ? (
            
                <List.Item
                  icon={
                    <HoverCard width={250} shadow="md">
                        <HoverCard.Target>
                            <ThemeIcon color="blue" size={24} radius="xl">
                            <IconArrowBadgeRight size="1.2rem" />
                            </ThemeIcon>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Text size="s">{item.hoverText}</Text>
                        </HoverCard.Dropdown>
                    </HoverCard>

                  }
                >
                  {item.text}
                </List.Item>
             
          ) : (
            <List.Item
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconArrowBadgeRight size="1.2rem" />
                </ThemeIcon>
              }
            >
              {item.text}
            </List.Item>
          )}
        </React.Fragment>
      ))}
    </List>
    </div>
  );
}

export default AccordionList;
