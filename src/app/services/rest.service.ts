import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getOrderDetail(id: string): Observable<any> {
    return this.http.get(`${base_url}/orders/${id}`)
  }

  sendPayment(token: string, id: string): Promise<any> {
    return this.http.patch(`${base_url}/orders/${id}`,
    {
      token}
      ).toPromise()
  }

  generateOrder( data: {name: string, amount: number}): Observable<any> {
    console.log(data);
    return this.http.post(`${base_url}/orders`, data)
  }

  confirmOrder(id : string): Promise<any> {
    return this.http.patch(`${base_url}/orders/confirm/${id}`, {}).toPromise()
  }
}
