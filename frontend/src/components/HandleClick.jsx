import axios from 'axios';

function HandleClick() {
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date 30 days ago
    const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10); // Get the 30 days ago date in YYYY-MM-DD format

    queryTopProduct('Comfortwear', thirtyDaysAgoDate, currentDate); // Replace 'yourCategory' with your actual category value

  };

  export default HandleClick;

  async function queryTopProduct(category, start, end) {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date 30 days ago
  
      const response = await axios.get(
        `https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/sales?category=${category}&start=${start}&end=${end}`,
        { timeout: 2000 }
      );
      
      console.log(response.data); // Log the response data or update the state with the data
    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
  }



  