import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:8000/api/v1/users/';
  constructor(private httpClient: HttpClient) { }

  findAllUsers() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.httpClient.get(this.url, httpOptions)
  }

  findOneUser(code: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.httpClient.get(`${this.url}${code}`, httpOptions)
  }

  create(body: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.httpClient.post(this.url, body, httpOptions)

  }

  update(body: any, code: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.httpClient.put(`${this.url}${code}`, body, httpOptions)
  }

  destroy(code: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.httpClient.delete(`${this.url}${code}`, httpOptions)
  }
}

