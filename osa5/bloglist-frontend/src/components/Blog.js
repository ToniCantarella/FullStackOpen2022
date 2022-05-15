import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const grid = {
    display: 'grid',
    padding: '10px',
    width: 'max-content',
    border: '2px solid rgba(0, 0, 0, 0.5)',
    margin: '5px 0px',
    backgroundColor: '#ff944d',
    gridTemplateColumns: '200px 200px 50px',
    borderRadius: '25px',
  }

  const gridItem = {
    border: '2px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '5px',
    padding: '5px',
    backgroundColor: '#e65c00',
  }

  const listGrid = {
    display: 'grid',
  }

  const listRow = {
    display: 'grid',
    marginTop: '10px',
    padding: '0px 10px',
    borderRadius: '10px',
    alignItems: 'center',
    gridTemplateColumns: '100px auto max-content',
    border: '2px dotted rgba(0, 0, 0, 0.5)',
    backgroundColor: '#ffe0cc'
  }

  const deleteBtn = {
    gridColumn: '1/1',
    width: 'max-content'
  }

  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? 'none' : '',
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    event.preventDefault()
    setLikes(likes + 1)
    updateBlog(blog.id, {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    window.confirm(`Remove blog named "${blog.title}" by ${blog.author}?`)
      ? deleteBlog(blog.id)
      : console.log('no information deleted')
  }

  return (
    <div>

      <div style={hideWhenVisible}>
        <div style={Object.assign(grid,)}>
          <div style={gridItem}>{blog.title}</div>
          <div style={gridItem}>{blog.author}</div>
          <button onClick={toggleVisibility}>show</button>
        </div>
      </div>

      <div style={showWhenVisible}>
        <div style={Object.assign(grid,)}>
          <div style={gridItem}>{blog.title}</div>
          <div style={gridItem}>{blog.author}</div>
          <button onClick={toggleVisibility}>hide</button>

          <div style={listGrid}>
            <div style={listRow}>
              <p>url:</p>
              <p>{blog.url}</p>
            </div>
            <div style={listRow}>
              <p>likes: </p>
              <p>{likes}</p>
              <button onClick={like}>like</button>
            </div>
            <div style={listRow}>
              <p>user: </p>
              <p>{blog.user.username}</p>
            </div>
          </div>

          <button onClick={removeBlog} style={deleteBtn}>delete</button>
        </div>
      </div>

    </div>
  )
}

export default Blog