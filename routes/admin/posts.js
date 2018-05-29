
const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
router.all('/*', (req, res, next)=>{

    req.app.locals.layout = 'admin';
    next();
});

router.get('/',(req, res)=>{

    res.send('IT WORK');
});

router.get('/create',(req, res)=>{
    
        res.render('admin/posts/create');
    });

    router.post('/create',(req, res)=>{
        
    let allComments = true;
    if(req.body.allComments){

        allComments = true;
    }else {

        allComments = false;
    }
   const newPost = Post({
  
    title: req.body.title,
    status: req.body.status,
    allComments: allComments,
    body: req.body.body
   });

   newPost.save().then(savedPost =>{

   res.redirect('/admin/posts');
   }).catch(error => {

    console.log('could not save post' + error);
   });
        });
    
module.exports = router;