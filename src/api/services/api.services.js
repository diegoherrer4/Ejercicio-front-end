import axios from "axios";
import API_ENDPOINT from "../constants/api-endpoints";
import OrderTest from "../models/order-test.model";

const ApiService = {
  async getOrderTests(startDate, endDate) {
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: { sampleCollectedStartDate: startDate, sampleCollectedEndDate: endDate },
      });
      return response.data.map((item) => Object.assign({}, OrderTest, item));
    } catch (error) {
      console.error('Error fetching order tests:', error);
    }
  }
};


export default ApiService;
