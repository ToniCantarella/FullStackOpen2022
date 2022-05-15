import {useState} from 'react'

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
                />
            </div>
            <div>
                author:
                <input 
                type="text"
                value={author}
                name="Author"
                onChange={handleAuthorChange}
                />
            </div>
            <div>
                url:
                <input 
                type="text"
                value={url}
                name="Url"
                onChange={handleUrlChange}
                />
            </div>
            <button type='submit'>Add blog</button>
            </form>
        )
}

export default BlogForm