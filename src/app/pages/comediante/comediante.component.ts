import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComediantesService } from '../../services/comediantes.service';
import { Comediantes } from 'src/app/models/youtube.models';
import { YoutubeService } from '../../services/youtube.service';
import { VideoResponse } from '../../models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comediante',
  templateUrl: './comediante.component.html',
  styleUrls: ['./comediante.component.css']
})
export class ComedianteComponent implements OnInit {

  videos: VideoResponse[] = [];
  idd: string = "";

  comico: Comediantes = {};
  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,
    private comedianteService: ComediantesService,
    private youtubeService: YoutubeService) { 
    }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.comico = this.comedianteService.getComediante(id);

    console.log(this.comico.id);

    this.youtubeService.getVideos(this.comico.id)
      .subscribe(resp => {

        this.videos = resp;
        console.log(this.videos);
      });

  }

  onRegresar() {
    this.location.back();
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
