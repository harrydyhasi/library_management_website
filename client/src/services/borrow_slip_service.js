import api from '../utils/http/http_client';

const borrowSlipService = {
    getAll: () => {
        return api.get('/borrowSlips');
    },

    add: (data) => {
        return api.post('borrowSlips', data)
    },

    update: (id, updatedData) => {
        return api.put(`/borrowSlips/${id}`, updatedData);
    },
    
    delete: (id) => {
        return api.delete(`/borrowSlips/${id}`);
    }


};

export default borrowSlipService;