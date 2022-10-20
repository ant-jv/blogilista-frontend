import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUserList } from '../reducers/userListReducer'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserInformation = () => {
  const userList = useSelector((state) => state.userList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUserList())
  }, [])

  const id = useParams().id
  const user = userList.find((n) => n.id === id)

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserInformation
