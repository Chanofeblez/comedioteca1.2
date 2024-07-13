import { Injectable } from '@angular/core';
import comediantes  from '../files/countries.json';
import { Comediantes } from '../models/youtube.models';


@Injectable({
  providedIn: 'root'
})
export class ComediantesService {

 comediantesAux: Comediantes[] = [];
 comediantesPaises: Comediantes[] = [];
 comico: Comediantes = {} ;
 id: string = "";

  constructor() { 
    this.comediantesAux = comediantes;   
  }

  public getComediantes() {    
    return this.comediantesAux;
   
  }

  public getComediante( name: string ) {  

   for ( let i=0; i< this.comediantesAux.length; i++){
     if( this.comediantesAux[i].name?.toLowerCase() === name.toLowerCase()){
     this.comico = this.comediantesAux[i];
     }
   }   
   return this.comico;
  }

  public getComediantesPaises( pais : string ){
    this.comediantesPaises = [];
    for(let i = 0; i < this.comediantesAux.length; i++){
     if(this.comediantesAux[i].country?.toLowerCase() === pais.toLowerCase()) {
         this.comediantesPaises.push( this.comediantesAux[i] );
      }
    }
    return this.comediantesPaises;
  }

  public crearIdComediantes() {

    this.id = "";
    for( let i=0; i<this.comediantesAux.length;i++){
      this.id += this.comediantesAux[i].id + ",";
    }
    console.log(this.id);
    return this.id;
  }

  
}
