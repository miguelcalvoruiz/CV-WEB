import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  public getHTML(): Observable<string> {
    if (isPlatformBrowser(this.platformId)) {
      let language = 'en';
      if (navigator.language && navigator.language.split('-')[0]) {
        language = navigator.language.split('-')[0];
      }
      let url = `./assets/home/home-${language}.html`;
      return this.http.get(url, { responseType: 'text' });
    } else {
      let url = `./assets/home/home-en.html`;
      return this.http.get(url, { responseType: 'text' });
    }
  }

  public downloadFile(path: any): Observable<any> {
    return this.http.get(path, { responseType: 'blob' });
  }
}
