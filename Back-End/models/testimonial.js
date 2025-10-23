const mongoose = require('mongoose');


const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true ,trim:true},
    feedback: { type: String, required: true },
    message: {
      type: String,
      required: true,
      trim: true,
    },
      createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    image: { type: String, default: 'default-user.png' },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
