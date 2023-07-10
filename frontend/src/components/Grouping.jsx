import {Group} from '@mantine/core';
import CardWidth from './CardWidth';
function Grouping() {
  return (
    <Group spacing="xs">
      <CardWidth imageUrl="https://down-sg.img.susercontent.com/file/0259518d03142c7a1bc2f7a472fe9916"
                  category = "Lifestyle"
                  title= "PUMA Unisex Shuffle Shoes Basics"
                  price= "$89"
                  sales= "7"
                  mthrev= "$623"
                  yearrev= "$7565"
                  ></CardWidth>

      <CardWidth imageUrl="https://down-sg.img.susercontent.com/file/sg-11134201-23030-9xcy6bizvwov99"
                  category="Running Shoes"
                  title= "PUMA Enzo 2 Men's Running Shoes"
                  price= "$72"
                  sales= "72"
                  mthrev= "$5184"
                  yearrev= "$62208"
                  ></CardWidth>

      <CardWidth imageUrl="https://down-sg.img.susercontent.com/file/sg-11134201-7qvcs-lh65gsgv6c5obe"
                  category="Comfortwear"
                  title= "Skye Clean Rare Women's Trainers"
                  price= "$55"
                  sales= "102"
                  mthrev= "$5610"
                  yearrev= "$67320"
                  ></CardWidth>
    </Group>
  );
}

export default Grouping;