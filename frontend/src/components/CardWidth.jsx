import CardThing from '../components/CardThing';

function CardWidth({ imageUrl, title, price, sales, mthrev, yearrev, category }) {
  return (
    <div style={{ maxWidth: '200px', margin: '0 auto' }}>
      <CardThing imageUrl={imageUrl}
                title={title}
                category={category}
                price={price}
                sales={sales}
                mthrev={mthrev}
                yearrev={yearrev}
      shadow="sm" padding="lg" radius="md" withBorder>
        
      </CardThing>
    </div>
  );
}


export default CardWidth;