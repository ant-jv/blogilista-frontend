import { useState } from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const AddCommentForm = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)

  if (!blog) {
    return null
  }

  const [newComment, setNewComment] = useState('')

  const addComment = async (event, blogObject) => {
    event.preventDefault()
    try {
      await blogService.updateBlog({
        ...blogObject,
        comments: [...blogObject.comments, newComment],
      })
      const newBlogs = blogs.map((blog) => {
        if (blog.id === blogObject.id) {
          return {
            ...blogObject,
            comments: [...blogObject.comments, newComment],
          }
        }
        return blog
      })
      setNewComment('')
      dispatch(setBlogs(newBlogs.sort((a, b) => b.likes - a.likes)))
      dispatch(
        setNotification({
          text: 'New comment added.',
          type: 'notification',
        })
      )
    } catch (exeption) {
      console.log('NOT', exeption)
    }
  }

  return (
    <div>
      <Form onSubmit={() => addComment(event, blog)}>
        <Form.Group>
          <Form.Control
            type="text"
            value={newComment}
            name="Title"
            onChange={({ target }) => setNewComment(target.value)}
          />
          <Button variant="primary" type="submit">
            Add Comment
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddCommentForm
