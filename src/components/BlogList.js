import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs, initializeBlogs } from '../reducers/blogsReducer'
import { useEffect } from 'react'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //TEMPORARY SÄÄTÖ START
  let user = {}
  const loggedUserJson = window.localStorage.getItem('loggedInUser')
  if (loggedUserJson) {
    ;(user = JSON.parse(loggedUserJson)), 'oioioi'
  }
  //TEMPORARY SÄÄTÖ STOP

  const blogs = useSelector((state) => state.blogs)

  const like = async (blogObject) => {
    try {
      await blogService.updateBlog({
        ...blogObject,
        likes: blogObject.likes + 1,
      })
      const newBlogs = blogs.map((blog) => {
        if (blog.id === blogObject.id) {
          return { ...blogObject, likes: blogObject.likes + 1 }
        }
        return blog
      })
      dispatch(setBlogs(newBlogs.sort((a, b) => b.likes - a.likes)))
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
      dispatch(
        setBlogs(
          blogs
            .filter((blog) => blog.id !== blogObject.id)
            .sort((a, b) => a.likes - b.likes)
        )
      )
    } catch (exeption) {
      console.log('NOT', exeption)
    }
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={like}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
