import loginService from '../services/login'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(setUser(user))
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
      navigate('/blogs')
    } catch (exeption) {
      dispatch(
        setNotification({
          text: `error logging in: ${exeption}`,
          type: 'error',
        })
      )
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default LoginForm
