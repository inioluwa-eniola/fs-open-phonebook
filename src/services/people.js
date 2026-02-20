import axios from 'axios'
// const url = 'http://localhost:3001/persons'
const url = '/api/persons'

const getAll = async () => {
    const response = await axios.get(url) 
    return response.data
}

const create = async (newObject) => {
    const response = await axios.post(url, newObject)
    return response.data
}

const remove = async(id) =>  {
    const response = await axios.delete(`${url}/${id}`)
    console.log(response.data)
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${url}/${id}`, newObject)
    console.log(response.data)
    return response.data
}

export default { getAll, create, remove, update }