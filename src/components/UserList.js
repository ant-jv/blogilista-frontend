import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUserList } from '../reducers/userListReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
  const userList = useSelector((state) => state.userList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUserList())
  }, [userList])
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
