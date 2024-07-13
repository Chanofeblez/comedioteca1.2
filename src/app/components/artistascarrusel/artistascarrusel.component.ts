import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comediantes } from '../../models/youtube.models';
import { ComediantesService } from '../../services/comediantes.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-artistascarrusel',
  templateUrl: './artistascarrusel.component.html',
  styleUrls: ['./artistascarrusel.component.css']
})
export class ArtistascarruselComponent implements OnInit, AfterViewInit {

  comediantes: Comediantes[] = [];

  constructor(private serviceComediantes: ComediantesService, 
              private router: Router) { }

  ngOnInit(): void {
    this.comediantes = this.serviceComediantes.getComediantes();
    console.log(this.comediantes);
  }

  ngAfterViewInit(){
    console.log(this.comediantes);
    setTimeout(() => {
    const swiper1 = new Swiper('.swiper', {   
      slidesPerView: 4.6,
      freeMode: true,
      spaceBetween: 2,     
      loop: true
    });
  }, 1000); 
  console.log(this.comediantes);
}

  onVideoClick( item: Comediantes) {     
    this.router.navigate(['comediante', item.name]);
 }

}
