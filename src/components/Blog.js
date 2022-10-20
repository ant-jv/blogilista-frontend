import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { useEffect } from 'react'
import { initializeBlogs, setBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import AddCommentForm from './AddCommentForm'
import { Button } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)

  if (!blog) {
    return null
  }

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
      dispatch(
        setNotification({
          text: `You liked blog "${blogObject.title}"`,
          type: 'notification',
        })
      )
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

  const DeleteButton = () => {
    if (!user) return
    if (user.username === blog.user.username) {
      return <button onClick={() => deleteBlog(blog)}>Delete</button>
    }
  }

  const comments = () => {
    if (blog.comments.length > 0) {
      let commentList = blog.comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))
      return <ul>{commentList}</ul>
    } else {
      return 'no comments'
    }
  }

  const likes = () => {
    if (blog.likes !== null) {
      return `${blog.likes} likes`
    } else {
      return null
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>{blog.user.name}</div>
      <div style={{ marginBottom: '10px' }}>
        {likes()}
        <Button
          variant="primary"
          style={{ marginLeft: '5px' }}
          onClick={() => like(blog)}
        >
          Like
        </Button>
      </div>
      <div>
        <h3>Comments</h3>
        <AddCommentForm />
        {comments()}
      </div>
      <DeleteButton />
    </div>
  )
}

export default Blog
