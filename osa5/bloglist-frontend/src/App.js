import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const loggedInRef = useRef()

  const timeOut = 90000 // 3000

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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('username: ', username, ' password: ', password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const Notification = () =>{
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

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          username: 
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password: 
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
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
        ? loginForm() 
        : loggedIn()
      }
      
    </div>
  )
}

export default App
