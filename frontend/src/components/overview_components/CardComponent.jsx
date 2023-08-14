import { Card, Image, Text, Button,HoverCard,Group } from '@mantine/core';
import React, { useState } from 'react';
import {BsLink45Deg} from 'react-icons/bs'



function CardComponent({ imageUrl, title, price, sales, mthrev, yearrev, category }) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = {
    backgroundColor: '#272829',
    color: '#8BE8E5',
    border: '2px gray',
    padding: '0.4em 1.3em',
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
    backgroundColor: '#5C8984', // Use different background color on hover
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
        <Text weight={600} size="L" noWrap style={{ marginBottom: 8 }}>
          {title}
        </Text>

        <Text size="m">{category}</Text>
        <Text size="m">Price: S${price}</Text>
        <Text size="m">Number Sold: {sales}</Text>
        <Text size="m">Monthly revenue: S${mthrev.toFixed(2)}</Text>
      <Text size="m">Annual Revenue: S${yearrev.toFixed(2)}</Text>

        <div style={{ marginTop: 16 }}>

        <HoverCard width={250} shadow="md">
          <HoverCard.Target>
              <Button className='LinkButton' style={buttonStyles} hoverStyles={buttonHoverStyles} onClick={handleLinkButtonClick}>
              <BsLink45Deg fontSize='2em' ></BsLink45Deg>
              </Button>
            </HoverCard.Target>
          <HoverCard.Dropdown>
          <Text size="s">
            Brings you to product listing
          </Text>
          </HoverCard.Dropdown>
      </HoverCard>
        </div>

      </Card.Section>
    </Card>
  );
}

export default CardComponent;
