import { useState } from 'react'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [showHideBtnLabel, setShowHideBtnLabel] = useState('Show')
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    showHideBtnLabel === 'Show' ? setShowHideBtnLabel('Hide') : setShowHideBtnLabel('Show')
  }

  const DeleteButton = () => {
    if (!user) return
    if (user.username === blog.user.username) {
      return <button onClick={() => deleteBlog(blog)}>Delete</button>
    } else {
      return 'EI NAPPIA'
    }
  }

  return (
    <div style={blogStyle} className='blog-element'>
      <div className='blog-short-info' onClick={() => toggleVisibility()}>
        {blog.title} {blog.author} <button className='show-button'>{showHideBtnLabel}</button>
      </div>
      <div style={showWhenVisible} className='additional-info'>
        {blog.url}<br />
        {blog.likes}<button className='like-button' onClick={() => like(blog)}>Like</button><br />
        {blog.user.name}<br />
        <DeleteButton />
      </div>
    </div>
  )
}

export default Blog