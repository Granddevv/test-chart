import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

import {Analyze} from "../models/analyze";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnalyzeService {

  constructor(
    private http: HttpClient
  ) { }

  getAnalyzeData(): Observable<Analyze> {
    const url = environment.url;
    return this.http.get(url, {headers: {token: environment.token}}) as Observable<Analyze>;
  }
}
