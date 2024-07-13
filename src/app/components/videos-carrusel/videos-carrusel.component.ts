import { Component, OnInit } from '@angular/core';
import { VideoResponse } from '../../models/youtube.models';
import { YoutubeService } from '../../services/youtube.service';
import { ComediantesService } from '../../services/comediantes.service';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-videos-carrusel',
  templateUrl: './videos-carrusel.component.html',
  styleUrls: ['./videos-carrusel.component.css']
})
export class VideosCarruselComponent implements OnInit {

  videos: VideoResponse[] = [];
  id: string = "";
  long: number = 0;
  arregloAleatorio:number[]=[];

  constructor(private youtubeService: YoutubeService,
              private comediantesService: ComediantesService) { }

  ngOnInit(): void {

    this.id = this.comediantesService.crearIdComediantes();
    this.youtubeService.getVideos(this.id)
       .subscribe( async (resp) => { 
         this.videos = resp;  
         this.long = this.videos.length;       
       console.log(this.videos);      
       this.crearArregloAleatorio();
       });

     
  }

  crearArregloAleatorio() {  
   
    for(let i = 0; i< 6; i++){      
      this.arregloAleatorio[i] =Math.floor((Math.random()* (this.long) + 0.0));
    }
    console.log(this.arregloAleatorio);
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

}
