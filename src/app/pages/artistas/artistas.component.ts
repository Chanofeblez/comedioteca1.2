import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comediantes } from 'src/app/models/youtube.models';
import { ComediantesService } from '../../services/comediantes.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent implements OnInit {

  comediantes: Comediantes[] = [];
  comediantesAux: Comediantes[] = [];
  paises: string[] = [];
  pais: string = "";
  bandera: boolean = false;

  constructor(private serviceComediantes: ComediantesService, 
              private router: Router) { 
                this.pais = "";
              }

  ngOnInit(): void {
    this.comediantes = this.serviceComediantes.getComediantes();
    this.crearArregloDePaises();
  }

  onVideoClick( item: Comediantes) {     
    this.router.navigate(['comediante', item.name]);
 }

 crearArregloDePaises() {
   this.pais="";
   for(let i=0; i<this.comediantes.length; i++){
      let aux = -1;
    this.pais = this.comediantes[i].country!.toLowerCase();
    if(this.paises.length===0){
      this.paises.push(this.pais);
    }else{
     for(let j=0;j<this.paises.length;j++){
       if(this.paises[j]===this.pais){
         aux=1;
         break;
       }       
     }
     if(aux===-1){
       this.paises.push(this.pais);
     }
    }
    
   }
 }

 seleccionarPais(pais:string){
 this.bandera = false;
  this.comediantesAux = [];
   for (let i=0; i < this.comediantes.length; i++){
     if( this.comediantes[i].country?.toLowerCase() === pais){
      this.comediantesAux.push(this.comediantes[i]);
   }
  }
  this.bandera = true; 
 }

 mostrarTodos(){
   this.bandera = false;
 }
}
