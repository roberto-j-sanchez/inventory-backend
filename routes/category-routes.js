const express = require('express');
const router = express.Router();

const Category = require('../models/category-model');
const Item = require('../models/item-model');

// POST ROUTE '/api/categories' => Create a new Category
router.post('/categories', (req, res, next) => {
  const { title, image } = req.body;

  Category.create({ 
    title,
    image, 
    items: [],
    owner: req.user._id
  })
  // send the query results as a JSON response to the client
  .then(categoryDoc => {
    res.json(categoryDoc);
  })
  .catch(err => {
    res.json(err);
  });
});

// GET ROUTE '/api/categories' => retrieve list of all categories
router.get('/categories', (req, res, next) => {
  // use find() method without parameters to retrieve all categories
  Category.find()
    .populate('items')
    .then(allCategories => {
      res.json(allCategories);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET ROUTE '/api/categories/:id' => to get a specific category/detailed view
router.get('/categories/:id', (req, res, next) => {
  Category.findById(req.params.id)
    // Categories have array of item ids
    // use populate() method to get item objects
    .populate('items')
    .then(categoryDoc => {
      res.status(200).json(categoryDoc);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT ROUTE '/api/categories/:id'=> update a specific category
router.put('/categories/:id', (req, res, next) => {
  Category.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.json({ message: `Category with ${req.params.id} is updated successfully` });
  })
  .catch(err => {
    res.json(err);
  });
});

// DELETE ROUTE '/api/categories/:id'=> delete a specific category
router.delete('/categories/:id', (req, res, next) => {
  Category.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Category with ${req.params.id} deleted successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
})

module.exports = router;
