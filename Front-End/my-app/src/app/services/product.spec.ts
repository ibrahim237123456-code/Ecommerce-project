import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Observable } from 'rxjs';



describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
}
);
