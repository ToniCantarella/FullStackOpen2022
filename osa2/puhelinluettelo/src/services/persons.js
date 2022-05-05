import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'
/* const baseUrl = '/api/persons' */

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const exports = {
    getAll,
    create,
    update,
    remove
}

export default exports