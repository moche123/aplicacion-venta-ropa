const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const {isAuthenticated}= require('../helpers/auth');
const User = require('../models/User');
router.get('/notes/add',isAuthenticated,(req,res)=>{
    res.render('notes/new-note');
});
router.post('/notes/new-note',isAuthenticated,async(req,res)=>{
    const {title,description,type} = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please write a title'});
    }
    if(!description){
        errors.push({text: 'Please write a description'});
    }
    if(!type){
        errors.push({text: 'Please write a type'})
    }
    if(errors.length>0){
        res.render('notes/new-note',{
            errors,
            title,
            description,
            type
        });
    }else{
      const newNote =  new Note({title, description,type});
      newNote.user = req.user.id;
      await newNote.save();
      req.flash('success_msg','Note added succesfully');
      res.redirect('/notes');
      
    }
    
});
router.get('/notes',isAuthenticated, async (req, res) => {
    await Note.find({user: req.user.id}).sort({date:'desc'})
      .then(documentos => {
        const contexto = {
            notes: documentos.map(documento => {
            return {
                _id: documento.id,
                title: documento.title,
                description: documento.description,
                type:documento.type
            }
          })
      
        }
        res.render('notes/all-notes', {
            notes: contexto.notes}) 
      });
      
     
      
});
router.get('/notes/edit/:id',isAuthenticated, async (req, res) => {

    const note = await Note.findById(req.params.id)
    .then(data =>{
        return {
            title:data.title,
            description:data.description,
            _id:data.id,
            type:data.type
        }
    })
    res.render('notes/edit-notes',{note})
});
router.put('/notes/edit-note/:id',isAuthenticated, async (req, res) =>{
    const {title,description,type} = req.body;
     await Note.findByIdAndUpdate(req.params.id,{title, description,type});
     req.flash('success_msg','Note Updated succesfully');
     res.redirect('/notes');
});
router.delete('/notes/delete/:id',isAuthenticated,async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note Deleted succesfully');
    res.redirect('/notes');
});

module.exports = router;