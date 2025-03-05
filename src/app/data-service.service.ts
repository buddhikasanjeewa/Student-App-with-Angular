import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  // public url = 'https://localhost:7120/api/StudentApi';
  public stuApiUrl = environment.studentApiUrl;
  public courseTypeApiUrl = environment.courseApiUrl;
  constructor(private httpClient: HttpClient) {}
  getStudents(): Observable<any> {
    return this.httpClient.get(this.stuApiUrl);
  }
  filterStudents(clCode: any): Observable<any> {
    return this.httpClient.get(this.stuApiUrl, clCode);
  }
  addStudent(data: any): Observable<any> {
    debugger;
    return this.httpClient.post<any>(this.stuApiUrl, data);
  }

  getStudentbyId(id: any): Observable<any> {
    this.stuApiUrl = this.stuApiUrl + '/' + id;
    debugger;
    return this.httpClient.get(this.stuApiUrl, id);
  }

  updateStudents(id: any, data: any): Observable<any> {
    // this.url=this.url+'/' +id +'/'+studentCode;
    debugger;
    return this.httpClient.put<any>(this.stuApiUrl, data);
  }

  getStudentfromSearch(text: string, type: number): Observable<any> {
    debugger;
    this.stuApiUrl = this.stuApiUrl + '/' + text + '/' + type;

    return this.httpClient.get<any>(this.stuApiUrl);
  }
  deleteStudents(id: any, index: any): Observable<any> {
    debugger;
    this.stuApiUrl = this.stuApiUrl + '/' + id;
    return this.httpClient.delete<any>(this.stuApiUrl);
  }
  // getCourseTypes
  getCourseType(): Observable<any> {
    return this.httpClient.get(this.courseTypeApiUrl);
  }
}
