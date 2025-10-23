import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestimonialService, Testimonial } from '../../services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  newTestimonial: Testimonial = {
    name: '',
    image: '',
    feedback: '',
    rating: 5,
    date: '',
  };

  loading = false;

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this.loading = true;
    this.testimonialService.getAll().subscribe({
      next: (res) => {
        this.testimonials = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading testimonials:', err);
        this.loading = false;
      }
    });
  }

  addTestimonial() {
    if (!this.newTestimonial.name || !this.newTestimonial.feedback) return;

    this.testimonialService.addTestimonial(this.newTestimonial).subscribe({
      next: (res) => {
        this.testimonials.unshift(res);
        this.newTestimonial = { name: '', image: '', feedback: '', rating: 5, date: '' };
      },
      error: (err) => console.error('Error adding testimonial', err)
    });
  }

  deleteTestimonial(id?: string) {
    if (!id) return;

    this.testimonialService.deleteTestimonial(id).subscribe({
      next: () => {
        this.testimonials = this.testimonials.filter(t => t._id !== id);
      },
      error: (err) => console.error('Error deleting testimonial', err)
    });
  }
}
