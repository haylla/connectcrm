import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

export default api;

/*import axios from 'axios';

const api = axios.create({
    baseURL: 'https://connectcrm-backend.apps.cloudfy.cloud/api'
});

export default api;


import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

export default api;*/