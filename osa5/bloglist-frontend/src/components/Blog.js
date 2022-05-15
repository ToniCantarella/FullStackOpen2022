import {useState} from 'react'

const Blog = ({blog, updateBlog}) => {
  const grid = {
    display: 'grid',
    padding: '10px',
    width: 'max-content',
    border: '1px solid rgba(0, 0, 0, 0.8)',
    margin: '5px',
    backgroundColor: '#99ffcc',
    gridTemplateColumns: '200px 200px 50px',
    borderRadius: '15px'
  }

  const gridItem = {
  }

  const listGrid = {
    display: 'grid',   
    height: 'max-content', 
    borderRadius: '15px'
  }

  const listRow = {
    display: 'grid',
    padding: '0px 10px',
    height: 'max-content',
    borderRadius: '15px',
    alignItems: 'center',
    gridTemplateColumns: '100px auto max-content',
    border: '2px dotted rgba(0, 0, 0, 0.8)',
    backgroundColor: '#6699ff'
  }

  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

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
          <div>{blog.title}</div>
          <div>{blog.author}</div>
          <button onClick={toggleVisibility}>hide</button>

          <div style={listGrid}>
            <div style={listRow}>
              <p>url:</p>
              <p>{blog.url}</p>
            </div>
            <div style={listRow}>
              <p>likes: </p>
              <p>{likes}</p>
              <button onClick={like} style={gridItem}>like</button>
            </div>
            <div style={listRow}>
              <p>user: </p>
              <p>{blog.user.username}</p>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default Blog