import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import UserList from './components/UserList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserInformation from './components/User'
import Home from './components/Home'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setUser(JSON.parse(window.localStorage.getItem('user'))))
  }, [])

  return (
    <div className="container">
      <Router>
        <Notification />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserInformation />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
