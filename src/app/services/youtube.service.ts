import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeURL = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyB_Fx9BNw8NjA3nGS18l250T5ghWcnCoKU';
  private id = '';
  private youtubeURLs = '';

  constructor(private http: HttpClient) { }

  getVideos( id : any) {

    this.id = id;

    const url = `${ this.youtubeURL }/videos`;

    const params = new HttpParams()
        .set('key', this.apiKey)
        .set('id', this.id)
        .set('part', 'snippet');

        return this.http.get<YoutubeResponse>( url, {params} )
                 .pipe(

                   map( resp => {
                     console.log( resp.items );
                     return resp.items;
                   })//,
                  // map( items => {
                  // return items.map( video => video.snippet)
                  //})
                 )
  }
}
