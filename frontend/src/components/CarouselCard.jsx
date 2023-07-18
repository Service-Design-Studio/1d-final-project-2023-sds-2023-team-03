import { Carousel } from '@mantine/carousel';
import { Text, Container, useMantineTheme, Title } from '@mantine/core';

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
    return (
        <section id="section-one">
            <Container>
                <Text color="black" align="center" mb="15px">
                    <Title order={1}>Top 5 Performing Products</Title>
                </Text>
                <Text color="black" align="center" mb="15px">
                    Keyword
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
                    {topProducts.map((product, index) => (
                        <Carousel.Slide key={product.id}>
                        <div style={carouselContent}>
                            <Title order={2} color="black">{index + 1}</Title>
                            <Text color="black">{product.product_name}</Text>
                            <Text color="black">Number Sold: {product.sales}</Text>
                            <Text color="black">Price: ${product.price}</Text>
                            <Text color="black">{product.competitor_name}</Text>
                        </div>
                    </Carousel.Slide>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
}

export default CarouselCard;
