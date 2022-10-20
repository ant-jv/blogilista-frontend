import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Navbar, Nav } from 'react-bootstrap'

const padding = {
  padding: 5,
}
/*const navStyle = {
  backgroundColor: '#EFEFEF',
  top: '0px',
  left: '0px',
  width: '100%',
  padding: '10px',
}*/

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  const logout = (event) => {
    event.preventDefault()
    dispatch(setUser(null))
    window.localStorage.setItem('user', null)
    navigate('/')
  }

  const logoutBtn = () => {
    if (user !== null) {
      return (
        <div style={{ float: 'right', marginRight: '10px' }}>
          {user.name} <Link onClick={logout}>Logout</Link>
        </div>
      )
    } else {
      return (
        <div style={{ float: 'right', marginRight: '10px' }}>
          <Link style={padding} to="/login">
            Login
          </Link>
        </div>
      )
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {logoutBtn()}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
