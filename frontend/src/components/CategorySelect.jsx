import { Select } from '@mantine/core';

function CategorySelect({setCategory}) {
  return (
    <Select
      label="Category"
      placeholder="Pick a category..."
      data={[
        { value: 'comfortwear', label: 'Comfortwear' },
        { value: 'running', label: 'Running' },
      ]}
      defaultValue="running"
      onChange={setCategory}
    />
  );
}

export default CategorySelect