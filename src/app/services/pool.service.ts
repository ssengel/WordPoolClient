import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pool } from '../models/pool';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  private readonly url = "http://localhost:8081/pool/";  
  
  constructor(private http: HttpClient) { }

  getPools(){
    return this.http.get<Pool[]>(this.url);
  }

  getPool(id: String){
    return this.http.get<Pool>(this.url + id);
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

  getWordsByPoolId(id: String){
    return this.http.get<Word[]>(this.url + id + "/word");
  }

  getWordsCountByPoolId(poolId: String){
    return this.http.get(this.url + poolId + "/wordCount")
  }

  
}
