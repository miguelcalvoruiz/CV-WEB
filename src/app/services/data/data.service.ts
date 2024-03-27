import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getHMTL() {
    let language = 'en';

    if (navigator.language && navigator.language.split('-')[0]) {
      language = navigator.language.split('-')[0];
    }

    let url = './assets/home/home-' + language + '.html';
    console.log(url);
    

    return this.http.get(url, { responseType: 'text' });
  }

  public downloadFile(path: any): Observable<any> {
    return this.http.get(path, { responseType: 'blob' });
  }
}
