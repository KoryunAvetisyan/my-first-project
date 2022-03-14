import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postStudent(data: any) {
    return this.http.post<any>("http://localhost:3000/students/", data);
  }
  getStudent() {
    return this.http.get<any>("http://localhost:3000/students/");
  }
  putStudent(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/students/" + id, data);
  }
  deleteStudent(id: number) {
    return this.http.delete<any>("http://localhost:3000/students/" + id);
  }

  postFaculty(data: any) {
    return this.http.post<any>("http://localhost:3000/faculties/", data);
  }
  getFaculty() {
    return this.http.get<any>("http://localhost:3000/faculties/");
  }
  patchFaculty(data: any, id: number) {
    return this.http.patch<any>("http://localhost:3000/faculties/" + id, data);
  }
  deleteFaculty(id: number) {
    return this.http.delete<any>("http://localhost:3000/faculties/" + id);
  }
  
  patchGroup(data: any, id: number) {
    return this.http.patch<any>("http://localhost:3000/faculties/" + id, data);
  }
  editGroup(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/faculties/" + id, data);
  }
  deleteGroup(data: any, id: number) {
    return this.http.patch<any>("http://localhost:3000/faculties/" + id, data);
  }
}
