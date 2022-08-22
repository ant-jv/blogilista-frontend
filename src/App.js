import { useState, useEffect, useRef } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(' ')

  const blogFormRef = useRef()
  const addBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => a.likes - b.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setTimeout(() => { setNotification(' ') }, 2000)
    } catch (exeption) {
      setNotification(`error logging in: ${exeption}`)
      setTimeout(() => { setNotification(' ') }, 2000)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const saveBlog = async (blogObject) => {
    blogService.setToken(user.token)
    try {
      const response = await blogService.saveBlog(blogObject)
      response.user = { 'username': user.username, 'name': user.name, 'id': response.user }
      setBlogs(blogs.concat(response).sort((a, b) => a.likes - b.likes))
      setNotification(`a new blog added: ${response.title} by ${response.author}`)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => { setNotification(' ') }, 2000)
      addBlogFormRef.current.setNewBlog({ 'title': '', 'author': '', 'url': '' })
    } catch (exeption) {
      setNotification(`blog not saved: ${exeption}`)
      setTimeout(() => { setNotification(' ') }, 2000)
    }
  }

  const like = async (blogObject) => {
    try {
      await blogService.updateBlog({ ...blogObject, likes: blogObject.likes + 1 })
      const newBlogs = blogs.map(blog => {
        if (blog.id === blogObject.id) {
          return ({ ...blogObject, likes: blogObject.likes + 1 })
        }
        return blog
      })
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
    } catch (exeption) {
      console.log('NOT', exeption)
    }
  }

  const deleteBlog = async (blogObject) => {
    const confirmation = window.confirm('Poistaanko?')
    if (!confirmation) return

    blogService.setToken(user.token)
    try {
      await blogService.deleteBlog(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id).sort((a, b) => a.likes - b.likes))
    } catch (exeption) {
      console.log('NOT', exeption)
    }
  }

  return (
    <div>
      <p className='notification' style={ { color: 'red' } }>{ notification }</p>
      {user === null ?
        loginForm()
        :
        <div>
          <p>{user.name} is logged in</p>
          <form onSubmit={logout}>
            <button type="submit">logout</button>
          </form>
          <Togglable showButtonLabel="Add Blog" hideButtonLabel="Cancel" ref={blogFormRef}>
            <AddBlogForm saveBlog={saveBlog} ref={addBlogFormRef}/>
          </Togglable>
        </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={like} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )
}

export default App
