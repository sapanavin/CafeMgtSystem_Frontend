import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient){ }



  ngOnInit(): void {
    
    
  }

  add(data:any){
    return this.httpClient.post(this.url +
      "/product/add", data,{
        headers: new HttpHeaders().set('Content-Type',"application/json"),
        responseType: 'text'//I added this to solve json parse error
        
      })
  }

  update(data:any){
    return this.httpClient.post(this.url +
      "/product/update", data,{
        headers: new HttpHeaders().set('Content-Type',"application/json"),
        responseType: 'text'//I added this to solve json parse error
        
      })
  }

  getProducts(){
    return this.httpClient.get(this.url+"/product/get");
  }

  updateStatus(data:any){
    return this.httpClient.post(this.url +
      "/product/updateStatus", data,{
        headers: new HttpHeaders().set('Content-Type',"application/json"),
        responseType: 'text'//I added this to solve json parse error
        
      })
  }
  delete(id:any){
    return this.httpClient.get(this.url +
      "/product/delete/"+id,{
        headers: new HttpHeaders().set('Content-Type',"application/json"),
        responseType: 'text'//I added this to solve json parse error
        
      })

      
  }
  getProductsByCategory(id:any){
    return this.httpClient.get(this.url+"/product/getByCategory/"+id);
  }

  getById(id:any){
    return this.httpClient.get(this.url+"/product/getById/"+id);
  }
  
}
