import { Card, Image, Text, Button } from '@mantine/core';
import React, { useState } from 'react';

function CardComponent({ imageUrl, title, price, sales, mthrev, yearrev, category }) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = {
    backgroundColor: '#323145',
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
    border: '2px solid blue',
  };
  const cardStyles = {
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
    backgroundColor: '#509066', // Use different background color on hover
    position: 'relative',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease, background-color 0.3s ease', // Add background-color transition
    padding: '3em',
    boxShadow: isHovered
      ? '0 5px 15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(117, 185, 190, 0.6)' // Increased spread radius
      : '0 5px 15px rgba(0, 0, 0, 0.4)',
  };

  const linkUrl = "http://127.0.0.1:3000/api/v1/products/all"; // Replace with your link URL

  const handleLinkButtonClick = () => {
    window.open(linkUrl, "_blank");
  };

  return (
    <Card
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)} // Handle mouse enter event
      onMouseLeave={() => setIsHovered(false)} // Handle mouse leave event
    >
      <Card.Section style={{ textAlign: 'center', paddingBottom: '1em' }}>
        <Image src={imageUrl} height={250} width={250} alt="Shopee" />
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
          <Button className='LinkButton' style={buttonStyles} hoverStyles={buttonHoverStyles} onClick={handleLinkButtonClick}>
            Link
          </Button>
        </div>
      </Card.Section>
    </Card>
  );
}

export default CardComponent;
