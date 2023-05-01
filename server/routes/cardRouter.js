const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const CardModelSchema = require('../models/CardModel');

router.get('/get-cards', verifyToken, async(req, res) => {
   const allCard = await CardModelSchema.find().populate('user_id');
   res.json({
      data: allCard.reverse(),
      tokenId: req.userId
   });
})

router.post('/create-card', verifyToken, async(req, res) => {
   const {
      user_id,
      title,
      description,
      image
   } = req.body;

   const card = await CardModelSchema.create({
      user_id: req.userId,
      ...req.body
   });

   console.log('card', card)
})

router.get('/edit-card/:id', async(req, res) => {
   let id = req.params.id;

   const defaultData = await CardModelSchema.findById(id);
   res.json({
      defaultData
   })
})

router.post('/edit-card/:id', verifyToken, async(req, res) => {
   let id = req.params.id;

   const {
      user_id,
      title,
      description,
      image
   } = req.body;

   try {
      const editData = await CardModelSchema.findByIdAndUpdate(id, req.body, {
         new: true
      });
      console.log('update card', editData)
      res.json({
         data: editData
      })
   } catch (err) {
      console.log('update card error', err)
      res.json({
         data: err
      })
   }
})

router.post('/delete-card/:id', async(req, res) => {
   let id = req.params.id;

   const deleteCard = await CardModelSchema.findByIdAndRemove(id)

   res.json({
		data: deleteCard
   })
})

router.get('/more-card/:id', async(req, res) => {
   let id = req.params.id;

   const moreCard = await CardModelSchema.findById(id).populate('user_id');

   res.json({
      data: moreCard
   })
})

module.exports = router
