import { Card, Image, Text, Button, Group } from '@mantine/core';

function CardComponent({ imageUrl, title, price, sales, mthrev, yearrev, category }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imageUrl}
          height={200}
          width={200}
          alt="Shopee"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        Category: {category}{'\n'}
        Price: {price}{'\n'}
        Sales: {sales}{'\n'}
        Monthly revenue: {mthrev}{'\n'}
        Annual Revenue: {yearrev}{'\n'}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Link
      </Button>
    </Card>
  );
}

export default CardComponent;