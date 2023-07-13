import { Grid, Col } from '@mantine/core';
import '../views/Home.css';
import Tables from './Tables';

function Column() {
  return (
    <Grid gutter="lg">
      <Col span={4} width="100px">
      <div class="textBox">
        <p>Competition</p>
        <br></br>
        <p>Your [category] is [percentage] higher priced by [percent]. Well performing products are price on average of [price]</p> 
      </div>   
      </Col>
      <Col span={4} width="200px">
      <div class="textBox">
        <p>Product Sales</p>
        <br></br>
        <p>Sales has [dropped/risen] by [percent] since [date]</p> 
      </div>
      </Col>
      <Col span={4} width="200px">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Tables></Tables>
      </div> 
      </Col>
    </Grid>
  );
}


export default Column;