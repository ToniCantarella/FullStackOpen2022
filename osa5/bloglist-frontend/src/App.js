import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  /* const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') */
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const loggedInRef = useRef()

  const timeOut = 3000 // 3000

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((prev, curr) => {
        return curr.likes - prev.likes
      }))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    console.log('username: ', username, /* ' password: ', password */)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      /* setUsername('')
      setPassword('') */
    } catch (exception) {
      setNotification('Wrong username or password')
      setError(true)
      setTimeout(() => {
        setNotification(null)
        setError(false)
      }, timeOut)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (blogObject) => {
    loggedInRef.current.toggleVisibility()
    const blog = await blogService.create(blogObject)
    setBlogs(blogs => [...blogs, blog])
    console.log('blog added!', blog)
    setNotification(`A new blog called "${blogObject.title}" by ${blogObject.author} was added!`)
    setTimeout(() => {
      setNotification(null)
    }, timeOut)
  }

  const updateBlog = async (id, blogObject) => {
    console.log(id)
    await blogService.update(id, blogObject)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const Notification = () => {
    let className = 'success'
    if (notification === null){
      return null
    }
    if (error === true) {
      className = 'error'
    }
    return (
      <div className={className + ' ' + 'notification'}>
        {notification}
      </div>
    )
  }

  const loggedOut = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
      />
    )
  }

  const loggedIn = () => {

    return(
      <div>

        <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>

        <Togglable buttonLabel='create' ref={loggedInRef}>
          <BlogForm
            addBlog={addBlog}
          />
        </Togglable>

        <div>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          )}
        </div>

      </div>
    )
  }

  return (
    <div>
      <Notification />

      {user === null
        ? loggedOut()
        : loggedIn()
      }

    </div>
  )
}

export default App
