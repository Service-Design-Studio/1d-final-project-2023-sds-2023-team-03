import { Table } from '@mantine/core';





function Tables({lowStockdata}) {
  const stocks = [
    { imageUrl: "data:image/jpeg;base64,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", name: 'lowStockData[0].product_name', remaining: "data.cies.y_axis[0]" },
    { imageUrl: "data:image/jpeg;base64,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", name: "PUMA Unisex Electron E Pro Shoes", remaining: '132' },
    { imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBATExAWExMWEBUQEBITFRIYFRISFREWFhUVExMYHSggGBolGxMVITEhJSkrLi4uGB8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQMEBQIGB//EADcQAAIBAgQEAggFAwUAAAAAAAABAgMRBCExURJBYXEFMhMiQlKBkcHRYnKh4fAUorEVIzOCwv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAENkgAAAAAAAqxM+GEn+FgWKS3JPnEjp+HYu/qyefst8+ncDoAAAAAAAAAAAAAAAAAAAAZ8fPhpy7W+eQHLxuI9JL8Kyj9zRgMbZ8Mnlyb5dGYIq+mfYtWHm/YfyA7wObhK84ZThJx5Ozuu+6OimBIAAGXxKVqcutl+pfUqxjZN5t2S5tnIx2Jc5W0SbS6vS4GYAAdfw/Fcas/Mv1W5sPnqdRxaa1X8sd6lUUoprRoD2AAAAAAAAAAAAAAAAZPEKsEkpK+d1He2/Q1nDxtVSm2tNE+wEyxk+VoraKRW6837cvmVgCxYia9uXzLoY+ouafdGUAbv8AU5e6v1PKxlSclFO13bLbnmYy+HqRcnlKStDoucgLKc+KtKfKN5fBKyMhfJcELe1Kza2gtF8SgAAABu8Lr2fC9Hmu5hF/uB9GDDhsTZR9JLOWcei5cRuAAAAAAAAAAAAAUYyvwQb56LuBk8VrO6gnla8uuyOcTKTbu3d7kAAAAJS/ZHqlSctMktZPRF9Pn6PJe1Vll8tgPKgoNXXFPlBZpfm3fQmb4W3L1qm3KHfd9Dw6qjlD4zfmfbZFIEyk2227t6sgAAAXxwr1k1BddfggKDRCiopSqf8AWHOXfZBV4w8kc/flr8FyKJSbd27vdgTVqOTber/RbI6/hr/213f+TkU4OTSWr/lzvUaajFRXJWA9gAAAAAAAAADxVqKKbeiONisS6jzyS0X36l3iWJUnwrRPN7vYxAACylScr8ktZPRAVl/oVG3HryprzPvse6XPgyS81WX/AJXI8Oso+TXnN+Z9tgPdXl6Tl5aUeX5timrVctcktIrRFYAAF1LDtq79WPvP6LmBSaFhrK83wLb2n2Q9PGH/ABrP35a/BciiTbd27vdgX/1PDlCPD+J5yf2KJO7u3d7sgmKbdkrvZAQeqdNydoq7/mpsw/hzecnZbLX58jpUqSirRVkBRgsIqau85PV7dEagAAAAAAAAeKlRRV27ID22crG47i9WOnN79uhXjMY55LKO3N9/sZQAB6pwcmktW7fuB7o0r3bdorV82/dXUsvxK8vVprKMVzey3e7IaU5KKdoRvn0Xmk+rK61XieWUUrRWy+4EVarlbkl5YrRHgAAe6VNydkrv/HdlkMPZcU3wrkval2XIipiLrhiuGOy1f5mB79Sn+OX9sfuU1ark7yd/8LsjwacPgpzz8q3f0QGYto4eU9I/F5I6lDAwjyu939jUBzqPhi9qV+iyXzN1KlGKtFJdj2AAAAAAAAAAbBi8Vm1BLd2fVW0AoxPiLeUNPe37GGUm3dtt9SAAAAAvo5QnLm/Uj8dX8iguqZUqfVyl9AJ8tPrN/wBsf3KDTWptuEYq7VOP655scEIeZ8cvdjovzMCqjRc9NOcnkl8S30kYeT1pe+9F+VFVavKeuS5RWiPNODk7RV3/ADXYCJSbd27vdlmHw8p6LLd6fub8N4clnPN7cv3NyVgM2GwMYZ+Z7v6I1AAAAAAAAAAAAAAAAzY+hxx1Ss756Gkhq+TA4c8LNey+6zX6FTi1qmvgzoVcDOOdOTt7t2rdil1q0deL4q4GQlRb0TfwZf8A11Tf+1EPGzft/KwEQws37Nussi2p6NKCk+Nxjbhjo3fmzLOo5ayb7sspYactIvu8kB6rYuUsvKtl9WUwi27JXeyOjR8MXtO/RafM3U6SirJJdgOfh/DW85u3RfVnQp01FWSsj2AAAAAAAAAAAAAAAAAAAAAAAAAIsOFbEgCFFbEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q==", name: "PUMA Platinum Shimmer Women's Training Shoes (Purple)", remaining: '109' },
    { imageUrl: "data:image/jpeg;base64,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", name: "PUMA Scorch Runner Men's Running Shoes (Gray)", remaining: '208' },
  ];
  console.log(typeof(stocks))

  const rows = stocks.map((stocks) => (
    <tr key={stocks.name}>
      <td>
        <img src={stocks.imageUrl} alt={stocks.name} style={{ maxWidth: '100px', height: 'auto' }} />
      </td>
      <td>{stocks.name}</td>
      <td>{stocks.remaining}</td>
    </tr>
  ));

  return (
    <Table withBorder withColumnBorders>
      <thead>
        <tr>
          <th>Icon</th>
          <th>Name</th>
          <th>Remainder</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table> 
  );

}

export default Tables;