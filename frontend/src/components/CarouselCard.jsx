import { Carousel } from '@mantine/carousel';
import { Text, Container, useMantineTheme, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const CarouselCard = ({ topProducts }) => {
    const theme = useMantineTheme();

    const carouselContent = {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.colors.gray[0],
        borderRadius: 15,
        gap: 15
    };

    function renderCards() {
        if (!topProducts) return;

        return topProducts.map((product, index) => (
            <Carousel.Slide key={product.id}>
                {/* TODO: Replace with link */}
                <a href={`https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/competitors/${product.competitorName}`} target='_blank' rel='noreferrer'>
                    <div style={carouselContent}>
                        <Text order={2} color="black">Rank: {index + 1}</Text>
                        <Text color="black">Product Name: {product.product_name}</Text>
                        <Text color="black">Number Sold: {product.sales}</Text>
                        <Text color="black">Price: ${product.price}</Text>
                    </div>
                </a>
        </Carousel.Slide>
        ))
    }

    return (
        <section id="section-one">
            <Container>
                <Text color="black" align="center" mb="15px">
                    <Title order={1}>Top 5 Performing Products</Title>
                </Text>
                <Text color="black" align="center" mb="15px" className="compKeywords">
                Breathable Shoes, Running Shoes, Lightweight, Moisture Wicking
                </Text>

                <Carousel
                    withIndicators
                    height={300}
                    slideSize="33.333333%"
                    slideGap="md"
                    breakpoints={[
                        { maxWidth: 'md', slideSize: '50%' },
                        { maxWidth: 'sm', slideSize: '100%', slideGap: 15 },
                    ]}
                    loop
                    align="start"
                    pr="10px"
                    pl="10px"
                >
                    {renderCards()}
                </Carousel>
            </Container>
        </section>
    );
}

export default CarouselCard;
