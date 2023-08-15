import axios from 'axios';

export const clienteApi = axios.create({
    baseURL: 'https://api-clientes-django.onrender.com/clientes/api/v1/cliente/'
});

export const getCliente = (id) => clienteApi.get(`/${id}/`);

export const createCliente = (cliente) => clienteApi.post('/', cliente);

export const updateCliente = (id, cliente) => clienteApi.put(`/${id}/`, cliente);

export const deleteCliente = (id) => clienteApi.delete(`/${id}/`);

export const listTipoDocumento = () => axios.get('https://api-clientes-django.onrender.com/clientes/api/v1/list_tipo_documento/')

