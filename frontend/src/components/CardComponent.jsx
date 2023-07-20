import { Card, Image, Text, Button } from '@mantine/core';

function CardComponent({ imageUrl, title, price, sales, mthrev, yearrev, category }) {
  const buttonStyles = {
    backgroundColor: 'teal',
    color: 'white',
    border: '2px gray',
    padding: '0.5em 1.5em',
    fontWeight: 500,
    boxShadow: 'none',
    borderRadius: 5,
  };

  const buttonHoverStyles = {
    backgroundColor: 'white',
    color: 'blue',
    border: '1px solid blue',
  };

  return (
    <Card>
      <Card.Section>
        <Image src={imageUrl} height={200} width={200} alt="Shopee" />
      </Card.Section>

      <Card.Section style={{ textAlign: 'center' }}>
        <Text weight={600} size="m" noWrap style={{ marginBottom: 8 }}>
          {title}
        </Text>

        <Text size="sm">{category}</Text>
        <Text size="sm">Price: {price}</Text>
        <Text size="sm">Sales: {sales}</Text>
        <Text size="sm">Monthly revenue: {mthrev}</Text>
        <Text size="sm">Annual Revenue: {yearrev}</Text>

        <div style={{ marginTop: 16 }}>
          <Button style={buttonStyles} hoverStyle={buttonHoverStyles}>
            Link
          </Button>
        </div>
      </Card.Section>
    </Card>
  );
}

export default CardComponent;
