const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Testiblogi1",
        author: "Testikirjuri",
        url: "www.testiblogi.com",
        likes: 13
    },
    {
        title: "Testiblogi2",
        author: "Testikirjuri Tuomas",
        url: "www.testiblogiToinen.com",
        likes: 55
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: "WillDelete",
        author: "Delete",
        url: "Delete",
        likes: 1
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}