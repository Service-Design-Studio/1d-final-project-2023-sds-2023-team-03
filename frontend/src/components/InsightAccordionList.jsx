import { List, ThemeIcon } from '@mantine/core';
import { IconUsers, IconBuildingStore, IconReportMoney } from '@tabler/icons-react';
import React, { useState } from 'react';

function AccordionList({ listItems }) {
  console.log("listitems: ", listItems);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getIconByType = (type) => {
    switch (type) {
      case 'products':
        return <IconBuildingStore size="1.1rem" />;
      case 'sales':
        return < IconReportMoney size="1.1rem" />;
      case 'competitors':
        return < IconUsers size="1.1rem" />;
      default:
        return null;
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <List spacing="xs" size="sm" align="left">
        {listItems.map((item, index) => (
          <React.Fragment key={index}>
            <List.Item
              icon={
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <ThemeIcon color="#102C57" size={24} radius="xl">
                    {getIconByType(item.type)}
                  </ThemeIcon>
                </div>
              }
            >
              {item.text}
            </List.Item>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default AccordionList;
