import { Table } from '@mantine/core';


const stocks = [
    { imageUrl: "https://down-sg.img.susercontent.com/file/00ccf149235ae9d2546e5e74d37c2472", name: "PUMA Unisex INTERFLEX Running Shoes", remaining: '102' },
    { imageUrl: "https://down-sg.img.susercontent.com/file/sg-11134201-22110-2w86gf84nyjv6e", name: "PUMA Unisex Electron E Pro Shoes", remaining: '132' },
    { imageUrl: "https://down-sg.img.susercontent.com/file/sg-11134201-23020-ffdwbty7p2nv41", name: "PUMA Platinum Shimmer Women's Training Shoes (Purple)", remaining: '109' },
    { imageUrl: "https://down-sg.img.susercontent.com/file/sg-11134201-7qvep-lgsy4nrmafxr15", name: "PUMA Scorch Runner Men's Running Shoes (Gray)", remaining: '208' },
  ];

function Tables() {

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
    <Table withBorder>
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