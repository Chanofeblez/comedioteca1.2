import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../models/mensaje';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private http: HttpClient) { }

  crearMensaje( formData: Mensaje ){
    
    return this.http.post(`${ base_url }/api/mensajes`, formData);

  }
}
