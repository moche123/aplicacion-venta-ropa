const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const {isAuthenticated}= require('../helpers/auth');
const Product = require('../models/Product');
router.get('/products/add',(req,res)=>{
    res.render('products/new-product');
});

router.get('/products', async (req, res) => {
    await Product.find().sort({date:'desc'})
      .then(documentos => {
        const contexto = {
            products: documentos.map(documento => {
            return {
                _id: documento.id,
                title: documento.title,
                description: documento.description,
                type:documento.type
            }
          })
      
        }
        res.render('products/all-products', {
            products: contexto.products}) 
      });
      
     
      
});
router.post('/products/addCar',isAuthenticated,async(req,res)=>{
  const {title,description,type} = req.body;
  console.log({title,description,type});
  const newNote =  new Note({title, description,type});
  newNote.user = req.user.id;
  console.log(req.user.id);
  await newNote.save();
  req.flash('success_msg','Note added succesfully'); 
  res.redirect('/notes'); 
});
router.get('/blondas', async (req, res) => {
  await Product.find({type:'blonda'}).sort({date:'desc'})
    .then(documentos => {
      const contexto = {
          products: documentos.map(documento => {
          return {
              _id: documento.id,
              title: documento.title,
              description: documento.description,
              type:documento.type
          }
        })
    
      }
      res.render('products/all-products', {
          products: contexto.products}) 
    });
});
router.get('/camisas', async (req, res) => {
  await Product.find({type:'camisa'}).sort({date:'desc'})
    .then(documentos => {
      const contexto = {
          products: documentos.map(documento => {
          return {
              _id: documento.id,
              title: documento.title,
              description: documento.description,
              type:documento.type
          }
        })
    
      }
      res.render('products/all-products', {
          products: contexto.products}) 
    });
});
router.get('/products/edit/:id', async (req, res) => {

    const product = await Product.findById(req.params.id)
    .then(data =>{
        return {
            title:data.title,
            description:data.description,
            _id:data.id,
            type:data.type
        }
    })
    res.render('products/edit-products',{product})
});
router.put('/products/edit-product/:id',async (req, res) =>{
    const {title,description,type} = req.body;
     await Product.findByIdAndUpdate(req.params.id,{title, description,type});
     req.flash('success_msg','Product Updated succesfully');
     res.redirect('/products');
});
router.delete('/products/delete/:id',async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Product Deleted succesfully');
    res.redirect('/products');
});

module.exports = router;