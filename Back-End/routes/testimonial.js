const express=require('express');
const{ getTestimonials, addTestimonial, deleteTestimonial } =require('../controllers/testimonial.js');

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', addTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;