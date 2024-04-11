import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private showDetailSubject = new BehaviorSubject<boolean>(false);
  public showDetail$ = this.showDetailSubject.asObservable();

  constructor() { }

  toggleDetail(value: boolean) {
    this.showDetailSubject.next(value);
  }
}
