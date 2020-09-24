const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { json } = require('express')

router.get('/' , async(req,res) => {
    try{
          const user = await User.find()
          res.json(user)
        
    }catch(error){
                    res.send('error' +error)    
    }
})
router.get('/:id' , async(req,res) => {
    try{
          const user = await User.findById(req.params.id)
          res.json(user)
        
    }catch(error){
                    res.send('error' +error)    
    }
})


router.post('/', async(req,res) => {

    const user = new User({

        username : req.body.username,
        password : req.body.password
    })
    try {
         const a1 = await  user.save()
         res.json(a1)
    } catch(err) {
        res.send("error")

    }

})
router.patch('/:id', async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        user.username = req.body.username
        const a1 = await user.save()
        res.json(a1)

    }catch(error){
        res.send(error)
    }
})
router.delete('/:id', async(req,res) => {
    //const user = await User.find(f => f.id=== parseInt(req.params.id));
    // if(!User) res.status(404).send('user not found not found');

   // const index = User.indexOf(user);
    // User.splice(index,1);
    try{
        const user = await User.findById(req.params.id)
        user.username = req.body.username
        const a1 = await user.remove()
        res.json(a1)

    }catch(error){
        res.send(error)
    }
    //res.send(user);


})
module.exports = router