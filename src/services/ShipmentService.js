import axios from 'axios';

axios.defaults.timeout = 600000;

export default {
  postOneShipment: async values => {
    try {
      const res = await axios.post('/api/v1/shipments', values, {
        withCredentials: true
      });
      if (res.data.status === 'success') {
        return { message: 'Shipment Added!' };
      }
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  postManyShipment: async formData => {
    try {
      const res = await axios.post(
        '/api/v1/shipments/manyShipments',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );
      if (res.data.status === 'success') {
        return { message: 'Shipment Added!' };
      }
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  deleteShipment: async id => {
    try {
      const res = await axios.delete(`/api/v1/shipments/${id}`, {
        withCredentials: true
      });
      if (res.status === 204) {
        return { message: 'Shipment Deleted!' };
      }
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  editOneShipment: async (values, id) => {
    try {
      const res = await axios.patch(`/api/v1/shipments/${id}`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        return { message: 'Shipment Updated!' };
      }
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  searchShipments: async values => {
    try {
      const res = await axios.post('/api/v1/shipments/search', values, {
        withCredentials: true
      });
      return res.data.data;
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  getShipmentsToday: async pagination => {
    console.log(pagination);
    try {
      const res = await axios.get(
        `/api/v1/shipments/shipsToday?page=${pagination}`,
        {
          params: {
            sort: 'carton'
          }
        },
        {
          withCredentials: true
        }
      );
      return res.data.data;
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  getShipments: async pagination => {
    console.log(pagination);
    try {
      const res = await axios.get(`/api/v1/shipments?page=${pagination}`, {
        withCredentials: true
      });
      return res.data.data;
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  getShipmentsAgent: async id => {
    try {
      const res = await axios.get(`/api/v1/users/${id}/shipments`, {
        withCredentials: true
      });
      return res.data.data;
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  getWeekShipmentsAgent: async () => {
    try {
      const res = await axios.get('/api/v1/shipments/getWeekShipmentsAgent', {
        withCredentials: true
      });
      return res.data.data;
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  searchShipmentsAgent: async (value, current) => {
    try {
      const res = await axios.post(
        '/api/v1/shipments/searchShipmentsAgent',
        { value, current },
        {
          withCredentials: true
        }
      );
      return res.data;
    } catch (error) {
      return {
        error: error.response
      };
    }
  },
  getWeeklyStats: async () => {
    try {
      const res = await axios.get('/api/v1/shipments/weeklyStats', {
        withCredentials: true
      });
      return res.data.data.stats;
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  getTotalStats: async () => {
    try {
      const res = await axios.get('/api/v1/shipments/stats', {
        withCredentials: true
      });
      return res.data.data.stats;
    } catch (error) {
      return {
        error: error.response.message
      };
    }
  },
  trackShipment: async values => {
    try {
      const res = await axios.post('/api/v1/shipments/trackShips', values, {
        withCredentials: true
      });
      return res.data.data;
    } catch (error) {
      return {
        error: error.response.statusText
      };
    }
  },
  getTotalAdminStats: async () => {
    try {
      const res = await axios.get('/api/v1/shipments/getTotalAdminStats', {
        withCredentials: true
      });
      return res.data.data.stats;
    } catch (error) {
      return {
        error: error.response.message
      };
    }
  },
  createManifest: async () => {
    try {
      const res = await axios.post('/api/v1/shipments/createManifest', {
        withCredentials: true
      });
      return res.data;
    } catch (error) {
      return {
        error: error.response
      };
    }
  },
  downloadManifest: async () => {
    try {
      const res = await axios.get(
        '/api/v1/shipments/downloadManifest',
        { responseType: 'blob' },
        {
          withCredentials: true
        }
      );
      return res.data;
    } catch (error) {
      return {
        error: error.response
      };
    }
  },
  updateStatus: async (values, shipids) => {
    try {
      const res = await axios.post(
        '/api/v1/shipments/updateStatus',
        {
          data: shipids,
          value: values
        },
        {
          withCredentials: true
        }
      );
      return res.data;
    } catch (error) {
      return {
        error: error.response
      };
    }
  },
  calculateFee: async value => {
    try {
      const res = await axios.post('/api/v1/shipments/calculateFee', value, {
        withCredentials: true
      });
      return res.data;
    } catch (error) {
      return {
        error: error.response
      };
    }
  }
};
