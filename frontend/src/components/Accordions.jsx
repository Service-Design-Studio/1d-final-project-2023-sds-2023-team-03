import { Accordion } from '@mantine/core';

function Accordions() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Accordion variant="contained" radius="xl" defaultValue="customization">
      <Accordion.Item value="Competition">
        <Accordion.Control>Competition</Accordion.Control>
        <Accordion.Panel>Your [category] is [percentage] higher priced by [percent]. Well performing products are price on average of [price]</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Product Sales">
        <Accordion.Control>Product Sales</Accordion.Control>
        <Accordion.Panel>Sales has [dropped/risen] by [percent] since [date]</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Product Actions">
        <Accordion.Control>Product Actions</Accordion.Control>
        <Accordion.Panel>There has been a recurring number of [product] left since [date]</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
    </div>
  );
}

export default Accordions;