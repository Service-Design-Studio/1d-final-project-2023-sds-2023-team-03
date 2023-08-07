import { List, ThemeIcon, HoverCard, Text } from '@mantine/core';
import { IconInfoCircleFilled, IconInfoCircle, IconArrowBadgeRight } from '@tabler/icons-react';
import React, { useState } from 'react';

function AccordionList({ listItems }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const iconStyles = {
    icon: {
      transition: 'all 0.1s ease',
      transform: 'scale(1.2)',
      color: 'white',
    },
    nonHoveredIcon: {
      transition: 'all 0.1s ease',
      transform: 'scale(1)',
      color: 'white',
    },
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <List spacing="xs" size="sm" align="left">
        {listItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.hoverText ? (
              <List.Item
                
                icon={
                   <div onMouseEnter={() => setHoveredIndex(index)}
                   onMouseLeave={() => setHoveredIndex(null)}>
                  <HoverCard width={250} shadow="md" >
                    <HoverCard.Target>
                      <ThemeIcon
                        color = 'blue'
                        size={24}
                        radius="xl"
                        style={
                          hoveredIndex === index
                            ? iconStyles.icon
                            : iconStyles.nonHoveredIcon
                        }
                      >
                        <IconInfoCircle size="1.2rem" />
                      </ThemeIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Text size="s">{item.hoverText}</Text>
                    </HoverCard.Dropdown>
                  </HoverCard>
                  </div>
                }
              >
                {item.text}
              </List.Item>
            ) : (
              <List.Item
                icon={
                  <ThemeIcon color="grey" size={24} radius="xl">
                    <IconInfoCircle size="1.2rem" />
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
