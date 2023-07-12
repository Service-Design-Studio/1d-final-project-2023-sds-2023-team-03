import React from 'react';
import { Button } from '@mantine/core';
import HandleClick from './HandleClick';

function Refresh() {
  return (
    <Button onClick={HandleClick}>
      Refresh Data
    </Button>
  );
}

export default Refresh;
