import React from 'react';
import { createStyles, Card, Image, Text, Group, RingProgress, rem } from '@mantine/core';

function CardWithStats() {
    const stats = [
      { title: 'Stat 1', value: 'Value 1' },
      { title: 'Stat 2', value: 'Value 2' },
      // Add more stats as needed
    ];
  
    return (
      <div>
        {/* Other components or content */}
        <CardWithStats
          image= "https://down-sg.img.susercontent.com/file/sg-11134201-22100-ars1owan7wiv45"
          description="Description of the Card"
          stats={stats}
        />
      </div>
    );
  }
  