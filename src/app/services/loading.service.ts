// src/app/services/loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  show(): void {
    setTimeout(() => this.loadingSubject.next(true), 0);
  }

  hide(): void {
    setTimeout(() => this.loadingSubject.next(false), 0);
  }
}