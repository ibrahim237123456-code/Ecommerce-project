import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { Observable } from 'rxjs';
import { Subscribable } from 'rxjs';
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrls: ['./loading-spinner.css']
})
export class LoadingSpinnerComponent {
    loading$: Observable<boolean>;
      @Input() overlay: boolean = false;
  @Input() color: string = 'primary';
  @Input() message: string = 'Loading...';

  @Input() params: { [key: string]: Observable<unknown> | Subscribable<unknown> | PromiseLike<unknown> } = {};

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;

  }
}



