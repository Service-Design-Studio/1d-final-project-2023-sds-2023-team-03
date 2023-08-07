import { Carousel } from '@mantine/carousel';
import { Text, Container, useMantineTheme, Title, Box } from '@mantine/core';
import { Link } from 'react-router-dom';

const CarouselCard = ({ topProducts }) => {
    const theme = useMantineTheme();

    const carouselContent = {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.colors.gray[0],
        borderRadius: 15,
    };

    const imageContainerStyle = {
        width: '80%',
        height: '50%',
        overflow: 'hidden',
        position: 'relative'
    };

    const imageStyle = {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translate(-50%)',
        width: '100%',
        height: 'auto'
    };

    function renderCards() {
        if (!topProducts) return;

        return topProducts.map((product, index) => (
            <Carousel.Slide key={product.id}>
                <a href={product.product_link} target='_blank' rel='noreferrer'>
                    <div style={carouselContent}>
                        <div style={imageContainerStyle}>
                            <img src={product.product_image_link} style={imageStyle} />
                        </div>
                        <Text order={2} color="black">Rank: {index + 1}</Text>
                        <Text color="black">Product Name: {product.product_name}</Text>
                        <Text color="black">Number Sold: {product.sales}</Text>
                        <Text color="black">Final Price: ${product.final_price}</Text>
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

                <Box mb="lg">
                    <Carousel
                        withIndicators
                        height={500}
                        slideSize="33.333333%"
                        slideGap="md"
                        breakpoints={[
                            { maxWidth: 'md', slideSize: '50%' },
                            { maxWidth: 'sm', slideSize: '100%', slideGap: 15 },
                        ]}
                        align="start"
                        pr="10px"
                        pl="10px"
                    >
                        {renderCards()}
                    </Carousel>
                </Box>
            </Container>
        </section>
    );
}

export default CarouselCard;
