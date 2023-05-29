const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = async Category.findAll({
      // Include the products associated
      include: [{
        model: Product
      }]
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    res.json(categoryData);
  } catch (err) {
    req.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try { 
    const categoryAdd = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categoryAdd);
  } catch (err) {
    res.status(500).json('{"message": "Error adding category"}');
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json('{"message": "Error updating category"}');
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryUpdate = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json('{"message": "Error deleting category"}');
  }
});

module.exports = router;
