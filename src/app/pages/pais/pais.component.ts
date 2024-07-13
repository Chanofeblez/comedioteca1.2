import { Component, OnInit } from '@angular/core';


import { Comediantes, VideoResponse } from '../../models/youtube.models';
import { ComediantesService } from '../../services/comediantes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../../services/youtube.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {  

 comediantes: Comediantes[]=[];
 comediantesPerfil : Comediantes[]=[];
 comediante: Comediantes={};
 
 videos: VideoResponse[] = [];
 videosFiltrados: VideoResponse[] = [];

 id: string = "";

 artistasBandera = true; 
 videosBandera = true;
 vacioPerfil= true;
 vacioVideo= true;
 noEncontrado=false;
 

  constructor(private comedianteService: ComediantesService, 
              private router: Router,
             // private activatedRoute: ActivatedRoute,
              private youtubeService: YoutubeService) { 
   
  }

  ngOnInit() {

   // const argumento  = this.activatedRoute.snapshot.params.texto;
    
    this.comediantes = this.comedianteService.getComediantes();
    this.id = this.comedianteService.crearIdComediantes();
    this.youtubeService.getVideos(this.id)
    .subscribe(resp => {

      this.videos = resp;
      console.log(this.videos);
    });    
  }

  buscarPelicula(argumento: string){
    this.noEncontrado = false;
    this.comediantesPerfil = [];
    this.videosFiltrados = [];
    
      for( let i =0; i<this.comediantes.length;i++){   
        console.log(this.comediantes[i].country?.toLowerCase().indexOf( argumento ));
        if( this.comediantes[i].country?.toLowerCase().indexOf( argumento ) !==-1){
          this.comediantesPerfil.push(this.comediantes[i]);
          
        } else if(this.comediantes[i].name?.toLowerCase().indexOf( argumento ) !== -1){
          this.comediantesPerfil.push(this.comediantes[i]);
          
        }
      }
      for( let i=0; i<this.videos.length;i++){
        if(this.videos[i].snippet.channelTitle.toLowerCase().indexOf(argumento) !== -1){
          this.videosFiltrados.push(this.videos[i]);          
        }
      }
      if( this.comediantesPerfil.length === 0){
        this.vacioPerfil = true;
      } else {
        this.vacioPerfil = false;
      }
      if( this.videosFiltrados.length === 0){
        this.vacioVideo = true;
      } else {
        this.vacioVideo = false;
      }
      if(this.comediantesPerfil.length === 0 && this.videosFiltrados.length === 0){
        this.noEncontrado= true;
      }
    
    }

    mostrarVideo(video: VideoResponse) {
      console.log(video);
      Swal.fire({
        html: `
        <h4 class="text-black"> ${  video.snippet.title  }</h4>
        <iframe width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/${ video.id }" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; 
                autoplay; 
                clipboard-write; 
                encrypted-media; 
                gyroscope;
                picture-in-picture" 
                allowfullscreen>
        </iframe>
        `
      })
    }
   
    todosLosResultados(){
      this.artistasBandera = true; 
      this.videosBandera = true;
    }

    mostrarArtistas(){
      this.artistasBandera = true; 
      this.videosBandera = false;
    }

    mostrarVideos(){
      this.artistasBandera = false; 
      this.videosBandera = true;
    }

    
    
  

  onVideoClick( item: Comediantes) {     
    this.router.navigate(['comediante', item.name]);
 }

}
