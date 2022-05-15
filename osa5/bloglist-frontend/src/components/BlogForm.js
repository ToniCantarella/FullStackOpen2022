import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      likes: 0,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      <h2>Add new blog</h2>
      <div>
                title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
                author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          required
        />
      </div>
      <div>
                url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
          required
        />
      </div>
      <button type='submit'>Add blog</button>
    </form>
  )
}

BlogForm.protoTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm