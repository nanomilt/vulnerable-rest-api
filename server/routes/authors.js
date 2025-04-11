const express = require('express');
const {Author} = require('../models/author');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req,res)=>{
    const authors = await Author.find();
    res.send(authors);
})

router.get('/:id', async (req,res)=>{
    const author = await Author.findById({_id: req.params.id});
    if(!author) return res.status(404).send("Author Not Found");
    res.send(author);
})

router.post('/', auth, async(req,res)=>{
    const author = await Author.findOne({email: req.body.email});
    if(author) return res.status(400).send('Author is Already Existed!');

    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).send(newAuthor);
})

router.put('/:id', auth, async(req,res)=>{
    const updatedAuthor = await Author.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            about: req.body.about,
            job: req.body.job
        }
    }, { new: true });

    if (!updatedAuthor) return res.status(404).send('The author with the given ID was not found');

    res.render('author', { author: updatedAuthor }); // Render safely escaped HTML
})

router.delete('/:id', auth, async(req,res)=>{
    const author = await Author.findByIdAndRemove({_id: req.params.id});
    if(!author) return res.status(404).send('The author with the given ID was not found');

    res.render('author', { author }); // Render safely escaped HTML
})

module.exports = router;