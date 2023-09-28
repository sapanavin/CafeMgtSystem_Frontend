import { Injectable } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url:string= environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getDetails(){
    console.log("Inside dashboardDetailsService to fetch dashboard details from backend");
    return this.httpClient.get(this.url+"/dashboard/details");
  }
}
