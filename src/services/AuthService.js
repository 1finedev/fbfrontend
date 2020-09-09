import axios from 'axios';

axios.defaults.timeout = 60000;

export default {
  login: async values => {
    try {
      const res = await axios.post('/api/v1/users/login', values, {
        withCredentials: true
      });
      const user = res.data.data.user;
      return { isAuthenticated: true, user };
    } catch (error) {
      return {
        isAuthenticated: false,
        user: { email: '', role: '' },
        error: error.response.data.message
      };
    }
  },
  logout: async () => {
    try {
      const res = await axios.post('/api/v1/users/logout/', {
        withCredentials: true
      });
      return res.data;
    } catch (error) {
      return {
        isAuthenticated: false,
        user: { email: '', role: '' },
        error: error.response.data.message
      };
    }
  },
  register: async values => {
    try {
      const res = await axios.post('/api/v1/users/signup', values);
      const user = res.data.data.user;
      return { isAuthenticated: true, user };
    } catch (error) {
      return {
        isAuthenticated: false,
        user: { email: '', role: '' },
        error: error.response.data.message
      };
    }
  },
  isAuthenticated: async () => {
    try {
      const res = await axios.post('/api/v1/users/authenticated', {
        withCredentials: true
      });
      const user = res.data.data.user;
      return { isAuthenticated: true, user };
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return {
          isAuthenticated: false,
          user: { email: '', role: '' },
          error: 'Request Timeout, Try again'
        };
      }
      return {
        isAuthenticated: false,
        user: { email: '', role: '' },
        error: error.response.data.message
      };
    }
  },
  forgotPassword: async values => {
    try {
      const res = await axios.post('/api/v1/users/forgotPassword', values, {
        withCredentials: true
      });
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  },
  resetPassword: async (values, token) => {
    console.log(token);
    console.log(values);
    try {
      const res = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        values,
        {
          withCredentials: true
        }
      );
      const user = res.data.data.user;
      return { isAuthenticated: true, user };
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return {
          isAuthenticated: false,
          user: { email: '', role: '' },
          error: 'Request Timeout, Try again'
        };
      }
      return {
        isAuthenticated: false,
        user: { email: '', role: '' },
        error: error.response.data.message
      };
    }
  }
};
