const express = require('express')
const shortid = require('shortid')

const server = express()
server.use(express.json());

let users = [
    {
        id: shortid(),
        name: 'Latosha Tims',
        bio: 'Pokemon master!'
    },
    {
        id: shortid(),
        name: "Ash Ketchum",
        bio: 'Lost the Pokemon championship to Latosha'
    },
    {
        id: shortid(),
        name: "Andrew Hoffmann",
        bio: "Awesome Sauce!"
    },
    {
        id: shortid(),
        name: "Cole Wilkison",
        bio: "Cool Beans!"
    }
]

server.get('/', (req, res) => {
    res.json({api: "Your API is started"})
})

//Creates a user using the information sent inside the `request body`
server.post('/api/users', function(req, res) {
    const newUser = req.body;
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } 
    users.push(newUser)
    res.status(201).json({message: "Yay you did it!"})

    if(!res) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

//Returns an array users
server.get('/api/users', function(req, res) {
    if(!res) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    } else {
    res.json(users)
    }
})

//Returns the user object with the specified `id`
server.get('/api/users/:id', function(req, res) {
    const id = req.params.id
    const userId = users.filter(user => user.id == id)
    if(!userId) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!res) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }  else {
    res.status(200).json(userId)
    }
})

//Removes the user with the specified `id` and returns the deleted user
server.delete('/api/users/:id', function(req, res) {
    const id = req.params.id
    if (!id) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!res){
        res.status(500).json({ errorMessage: "The user could not be removed" })
    } else {
    const userId = users.filter(user => user.id !== id)
    res.status(200).json(userId) 
    }
})

//Updates the user with the specified `id` using data from the `request body`. Returns the modified user
server.patch('/api/users/:id', function(req, res) {
    const id = req.params.id
    const {name, bio} = req.body
    const userId = users.find(user => user.id === id)
    console.log(userId)
    if(!userId) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        userId.name = name
        userId.bio = bio
        res.status(200).json({message: 'You did it!'})
    }
})



server.listen(8000, () => console.log("\n== API is Running ==\n"))
