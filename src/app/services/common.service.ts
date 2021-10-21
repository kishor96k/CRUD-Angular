import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  api = "http://localhost:3000/records";


  getRecords() {
    return this.http.get<any>(this.api).pipe(map((res: any) => {
      return res;
    }))
  }


  addRecords(data: any) {
    return this.http.post<any>(this.api, data).pipe(map((res: any) => {
      return res;
    }))
  }


  updateRecords(data:any, id:number) {
    return this.http.put<any>("http://localhost:3000/records/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }


  deleteRecords(id: number) {
    return this.http.delete<any>("http://localhost:3000/records/"+ id).pipe(map((res: any) => {
      return res;
    }))
  }





}
