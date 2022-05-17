import axios from 'axios';

const Api = async (url, data, method, config = '') => {
    const urlFull = 'http://192.168.200.98:7000' + url;

    switch (method) {
        case 'POST':
            try {
                const res = await axios.post(urlFull, data, config)
                return Promise.resolve(res);
            } catch (error) {
                return Promise.reject(error);
            }

        case 'GET':            
            try {
                const res = await axios.get(urlFull, data);
                return Promise.resolve(res);
            } catch (error) {
                return Promise.reject(error);
            }
        
        case 'PATCH':
            try {
                const res = await axios.patch(urlFull, data, config);
                return Promise.resolve(res);
            } catch (error) {
                return Promise.reject(error);
            }

        case 'DELETE':
            try {
                const res = await axios.delete(urlFull, data, config);
                return Promise.resolve(res);
            } catch (error) {
                return Promise.reject(error);
            }
    }
};

export default Api;