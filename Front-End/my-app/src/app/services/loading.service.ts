import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

    
  constructor() {}

    



  show() {
    this.loadingSubject.next(true);
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, 5000);

  }


  hide() {
    this.loadingSubject.next(false);
  }
  
}
