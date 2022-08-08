import { useState } from 'react'

const AddBlogForm = ({ saveBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      ...newBlog,
      likes: null
    }
    saveBlog(blogObject)
  }

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
}

export default AddBlogForm