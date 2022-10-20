import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { useEffect } from 'react'
import Togglable from './Togglable'
import AddBlogForm from './AddBlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <h2>blogs</h2>
      <Togglable showButtonLabel="Add new blog" hideButtonLabel="Cancel">
        <AddBlogForm />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
