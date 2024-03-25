import { Injectable } from '@angular/core';
import { ResolutionConstants } from './constants/ResolutionConstants';


@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  private _size: string = '';

  get size(): string {
    return this._size;
  }

  set size(value: string) {
    this._size = value;
  }

  setSize(width: number): void {
    if (width >= ResolutionConstants.MOBILE_MIN && width <= ResolutionConstants.MOBILE_MAX) {
      this.size = ResolutionConstants.MOBILE;
    } else if (width >= ResolutionConstants.TABLET_MIN && width <= ResolutionConstants.TABLET_MAX) {
      this.size = ResolutionConstants.TABLET;
    } else {
      this.size = ResolutionConstants.WEB;
    }
  }
}
