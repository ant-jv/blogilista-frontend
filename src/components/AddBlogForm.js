import { useState, useImperativeHandle, forwardRef } from 'react'

const AddBlogForm = forwardRef((props, ref) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      ...newBlog,
      likes: null
    }
    props.saveBlog(blogObject)
  }

  useImperativeHandle(ref, () => {
    return {
      setNewBlog
    }
  })

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={createBlog}>
        <div>
            title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, 'title': target.value })}
          />
        </div>
        <div>
            author
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({ ...newBlog, 'author': target.value })}
          />
        </div>
        <div>
                    url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog({ ...newBlog, 'url': target.value })}
          />
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  )
})

AddBlogForm.displayName = 'AddBlogForm'

export default AddBlogForm