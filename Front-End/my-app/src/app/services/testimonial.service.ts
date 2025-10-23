import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';

export interface Testimonial {
  _id?: string;
  name: string;
  feedback: string;
  rating: number;
  image?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = `${environment.apiUrl}/testimonials`; // ✅ استخدم environment بدل ما تكتب الرابط يدويًا

  constructor(private http: HttpClient) {}

  getAll(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.apiUrl);
  }

  addTestimonial(data: Testimonial): Observable<Testimonial> {
    return this.http.post<Testimonial>(this.apiUrl, data);
  }

  deleteTestimonial(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
