import { useState } from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const AddBlogForm = () => {
  const dispatch = useDispatch()

  const user = JSON.parse(window.localStorage.getItem('user'))
  const blogs = useSelector((state) => state.blogs)

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const saveBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      ...newBlog,
      likes: null,
    }

    try {
      blogService.setToken(user.token)
      const response = await blogService.saveBlog(blogObject)
      response.user = {
        username: user.username,
        name: user.name,
        id: response.user,
      }
      dispatch(
        setBlogs(blogs.concat(response).sort((a, b) => a.likes - b.likes))
      )
      dispatch(
        setNotification({
          text: `a new blog added: ${response.title} by ${response.author}`,
          type: 'notification',
        })
      )
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (exeption) {
      dispatch(
        setNotification({ text: `blog not saved: ${exeption}`, type: 'error' })
      )
    }
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <Form onSubmit={saveBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>

          <Form.Control
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddBlogForm
