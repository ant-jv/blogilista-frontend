import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const saveBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const updateBlog = async (blogObject) => {
  const response = await axios.put(baseUrl + `/${blogObject.id}`, blogObject)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + `/${blogId}`, config)
  return response.data
}

export default { getAll, saveBlog, setToken, updateBlog, deleteBlog }
