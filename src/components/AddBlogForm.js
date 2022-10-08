import { useState } from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const AddBlogForm = () => {
  //TEMPORARY SÄÄTÖ START
  let user = {}
  const loggedUserJson = window.localStorage.getItem('loggedInUser')
  if (loggedUserJson) {
    user = JSON.parse(loggedUserJson)
  }
  //TEMPORARY SÄÄTÖ STOP

  const dispatch = useDispatch()

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
        setNotification(
          `a new blog added: ${response.title} by ${response.author}`
        )
      )
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (exeption) {
      dispatch(setNotification(`blog not saved: ${exeption}`))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    }
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={saveBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  )
}

export default AddBlogForm
