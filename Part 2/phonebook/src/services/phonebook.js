import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    return (
        request
            .then(responce => responce.data)
            .catch(error => {
                console.log(`Failed to fetch server json data`)
                console.log(error)
            })
    )
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return (
        request
            .then(response => response.data)
            .catch(error => {
                console.log(`Failed to update ${newObject}`)
                console.log(error)
            })
    )
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return (
        request
            .then(response => response.data)
            .catch(error => {
                console.log(`Failed to update object with id: ${id}`)
                console.log(error)
            })
    )
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return (
        request
            .then(response => response.data)
            .catch(error => {
                console.log(`Failed to remove object with id: ${id}`)
                console.log(error)
            })
    )
}
export default{
    getAll,
    create,
    update,
    remove
}
