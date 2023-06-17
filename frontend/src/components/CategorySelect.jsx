import { Select } from '@mantine/core';

function CategorySelect({setCategory}) {
  return (
    <Select
      label="Category"
      placeholder="Pick a category..."
      data={[
        { value: 'COMFORT', label: 'Comfortwear' },
        { value: 'RUNNING', label: 'Running' },
      ]}
      defaultValue="RUNNING"
      onChange={setCategory}
    />
  );
}

export default CategorySelect