const express = require('express');
const router = express.Router();

const Item = require('../models/user-model');
const Folder = require('../models/category-model');

// POST ROUTE '/api/items'=> create a new item
router.post('/items', (req, res, next) => {
  const { itemName, image, quantity, price, notes, info, serialNumber, web, purchaseDate, returnDate, warranty } = req.body;

  /* if (
    (itemName == '' || quantity == '' || price == '' === null )
  ) {
    // send error JSON if any of the fields is empty
    res.status(401).json({ message: 'Field is required.' });
    return;
  } */

  Item.create({
    itemName,
    image,
    quantity,
    price,
    notes,
    info,
    serialNumber,
    web,
    purchaseDate,
    returnDate, 
    warranty
  })
    .then(itemDoc => {
      Category.findByIdAndUpdate(req.body.categoryId, { $push: { items: itemDoc._id } })
      .then(theItemDoc => { 
        res.json(theItemDoc) 
      })
      .catch(err => { 
        res.json(err) 
      })
    })
    .catch(err => { 
      res.json(err)
    })
  })

// GET route => retrieve a specific item
router.get('/categories/:categoryId/items/:itemId', (req, res, next) => {
  Item.findById(req.params.itemId)
  .then(itemDoc => {
    res.json(itemDoc);
  })
  .catch( err => {
    res.json(err);
  })
});

// PUT route => update a specific item
router.put('/items/:id', (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.json({ message: `Item with ${req.params.id} updated successfully.` });
  })
  .catch(err => {
    res.json(err);
  })
})

// DELETE route => delete a specific item
router.delete('/items/:id', (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
  .then(() => {
    res.json({ message: `Item with ${req.params.id} removed successfully` });
  })
  .catch(err => {
    res.json(err);
  })
})

module.exports = router;
