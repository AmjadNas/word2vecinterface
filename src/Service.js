import axios from 'axios';
const production = true;
const api_link = production
  ? 'http://132.75.249.68:80'
  : 'http://127.0.0.1:5000';

const setCookie = (data, minutes) => {
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() + minutes);
  document.cookie = `user=${data}; expires= ${dt}; path=/;`;
};

class ServiceObj {
  async login(form) {
    const res = await axios.post(`${api_link}/login`, form);
    axios.defaults.headers.common['Authorization'] = res.data.token;
    setCookie(res.data.token, 30);
    // , {
    //   withCredentials: true,
    //   headers: {
    //     'Access-Control-Allow-Credentials': true,
    //   },
    // }
    // .then((res) => {
    //     axios.defaults.headers.common['Authorization'] = res.data.token;

    //     console.log(new Cookies('user'));

    //   })

    return true;
  }

  async sendCompareData(form) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    };
    return await axios.post(`${api_link}/results`, form, config);
  }

  async sendTrainData(form, listener) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      onUploadProgress: listener,
    };
    return await axios.post(`${api_link}/`, form, config);
  }

  async getModels() {
    return await axios.get(`${api_link}/models`);
  }

  isLogged() {
    if (document.cookie) return true;
    else return false;
  }

  logOut() {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    delete axios.defaults.headers.common.Authorization;
  }
}

const Service = (function () {
  let instance;

  function createInstance() {
    const object = new ServiceObj();

    if (document.cookie) {
      const cookie = document.cookie.split(';')[0];
      const token = cookie.split('=')[1];
      axios.defaults.headers.common['Authorization'] = token;
    }
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = true;

    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default Service.getInstance();
