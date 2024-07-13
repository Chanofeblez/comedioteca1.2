import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { ComediantesService } from '../../services/comediantes.service';
import { Comediantes } from 'src/app/models/youtube.models';
import { VideoResponse } from '../../models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos: VideoResponse[] = [];
  videosFiltrados: VideoResponse[] = [];
  id: string = "";
  nombreCanal: string = "";
  bandera: boolean = false;

  constructor(private youtubeService: YoutubeService,
              private comediantesService: ComediantesService) { }

  ngOnInit(): void {

   this.id = this.comediantesService.crearIdComediantes();
   this.youtubeService.getVideos(this.id)
      .subscribe(resp => {

        this.videos = resp;
        console.log(this.videos);
      });      
  }

  buscarPelicula(txtBuscar: string) {

    this.nombreCanal = "";
    txtBuscar = txtBuscar.toLowerCase();
    this.videosFiltrados = [];
    txtBuscar = txtBuscar.trim();

    if( txtBuscar.length === 0){
      return;
    }

    for(let i=0; i< this.videos.length; i++){
      this.nombreCanal = this.videos[i].snippet.channelTitle;
      this.nombreCanal = this.nombreCanal.toLowerCase();
     if( this.nombreCanal.includes( txtBuscar )){
       this.videosFiltrados.push( this.videos[i]);
     }     
    }    
     this.bandera = true;        
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
