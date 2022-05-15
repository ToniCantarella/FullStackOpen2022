const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    console.log(savedBlog._id)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )
      
  response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter