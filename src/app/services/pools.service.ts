import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pool } from '../models/pool';

@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  private readonly url = "http://212.125.24.247:8080/pool/";  
  
  constructor(private http: HttpClient) { }

  getAllPools(){
    return this.http.get<Pool[]>(this.url);
  }

  createPool(pool: Pool){
      return this.http.post<Pool>(this.url, pool);
  }

  updatePool(pool: Pool){
    return this.http.put<Pool>(this.url + pool._id, pool);
  }

  deletePool(id: String){
    return this.http.delete<Pool>(this.url + id)
  }
}
