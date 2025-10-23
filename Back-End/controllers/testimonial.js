const Testimonial = require('../models/testimonial');

 const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error });
  }
};

 const addTestimonial = async (req, res) => {
  try {
    const { name, feedback, message, rating } = req.body;
    const testimonial = new Testimonial(req.body);
     if (!userName || !message) {
      return res.status(400).json({ message: "userName and message are required" });
     }
         const newTestimonial = new Testimonial({ userName, message, rating });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
    
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error adding testimonial', error });
  }
};

 const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting testimonial', error });
  }
};
module.exports = {
  getTestimonials,
  addTestimonial,
  deleteTestimonial
};