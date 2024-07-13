import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../../services/youtube.service';
import { VideoResponse } from '../../models/youtube.models';

@Component({
  selector: 'app-poster-grid',
  templateUrl: './poster-grid.component.html',
  styleUrls: ['./poster-grid.component.css']
})
export class PosterGridComponent implements OnInit {

  videos: VideoResponse[] = []; 

  constructor(private router: Router, 
              private youtubeService: YoutubeService) {}
  
              ngOnInit() {

                this.youtubeService.getVideos("a")
                   .subscribe( resp => {
                     
                     this.videos = resp;
                     console.log( this.videos);
                   });
              }

  onVideoClick( video: VideoResponse) {     
     this.router.navigate(['comediante', video.id]);
  }

}
