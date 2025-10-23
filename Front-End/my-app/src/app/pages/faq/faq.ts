import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroments';

interface FAQ {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.css']
})
export class FAQComponent implements OnInit {
  faqs: FAQ[] = [];
  newFAQ: FAQ = { question: '', answer: '', category: '' };
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFAQs();
  }

  loadFAQs() {
    this.isLoading = true;
    this.http.get<FAQ[]>(`${environment.apiUrl}/faqs`).subscribe({
      next: (res) => {
        this.faqs = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading FAQs', err);
        this.isLoading = false;
      }
    });
  }

  addFAQ() {
    if (!this.newFAQ.question || !this.newFAQ.answer) return;

    this.http.post(`${environment.apiUrl}/faqs`, this.newFAQ).subscribe({
      next: (res: any) => {
        this.faqs.unshift(res.faq);
        this.newFAQ = { question: '', answer: '', category: '' };
      },
      error: (err) => console.error('Error adding FAQ', err)
    });
  }

  deleteFAQ(id: string) {
    this.http.delete(`${environment.apiUrl}/faqs/${id}`).subscribe({
      next: () => {
        this.faqs = this.faqs.filter(f => f._id !== id);
      },
      error: (err) => console.error('Error deleting FAQ', err)
    });
  }
}



interface FAQ {
  question: string;
  answer: string;
  open?: boolean;
}

export class QaComponent {
  faqs: FAQ[] = [
    {
      question: 'How long does delivery take?',
      answer: 'Delivery usually takes between 2–5 business days depending on your location.',
    },
    {
      question: 'Can I return or exchange a product?',
      answer: 'Yes! You can return or exchange any unused product within 14 days of delivery.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within Egypt, but we’re expanding soon!',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, Mastercard, and Cash on Delivery.',
    },
    {
      question: 'How do I track my order?',
      answer: 'After placing your order, you’ll receive a tracking link via email or SMS.',
    }
  ];

  toggleFAQ(faq: FAQ) {
    faq.open = !faq.open;
  }
}
