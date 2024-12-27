import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  public url = 'https://localhost:7120/api/StudentApi';
  constructor(private httpClient: HttpClient) {}
  getStudents(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  filterStudents(clCode: any): Observable<any> {
    return this.httpClient.get(this.url, clCode);
  }
  addStudent(data: any): Observable<any> {
    debugger;
    return this.httpClient.post<any>(this.url, data);
  }

  getStudentbyId(id: any): Observable<any> {
    this.url = this.url + '/' + id;
    debugger;
    return this.httpClient.get(this.url, id);
  }

  updateStudents(id: any, data: any): Observable<any> {
    // this.url=this.url+'/' +id +'/'+studentCode;
    debugger;
    return this.httpClient.put<any>(this.url, data);
  }

  getStudentfromSearch(text: string, type: number): Observable<any> {
    debugger;
    this.url = this.url + '/' + text + '/' + type;

    return this.httpClient.get<any>(this.url);
  }
  deleteStudents(id: any, index: any): Observable<any> {
    debugger;
    this.url = this.url + '/' + id;
    return this.httpClient.delete<any>(this.url);
  }
}
