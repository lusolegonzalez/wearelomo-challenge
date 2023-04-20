import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) { }

  postTodo(data:any) {
    return this.http.post<any>("https://gorest.co.in/public/v2/todos", data, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer 2eae9fdfa7d6cb47233fb499d995aacef880d3a2f9e181e18dd8061fe5e82cb1"
      }
    })
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getTodo(data:any) {
    return this.http.get<any>("https://gorest.co.in/public/v2/todos", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateTodo(data:any) {
    console.log('data is', data);
    
    return this.http.put<any>("https://gorest.co.in/public/v2/todos/" + data.id, data, {
      "headers": {
        "Authorization": "Bearer 2eae9fdfa7d6cb47233fb499d995aacef880d3a2f9e181e18dd8061fe5e82cb1"
      }
    })
    .pipe(map((res:any)=>{
      return res;
    }))
  }

    deleteTodo(data:any) {
      return this.http.delete<any>("https://gorest.co.in/public/v2/todos", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}
