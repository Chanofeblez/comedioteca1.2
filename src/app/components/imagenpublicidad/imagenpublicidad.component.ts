import { Component, OnInit } from '@angular/core';
import { ModalDonacionesService } from '../../services/modal-donaciones.service';

@Component({
  selector: 'app-imagenpublicidad',
  templateUrl: './imagenpublicidad.component.html',
  styleUrls: ['./imagenpublicidad.component.css']
})
export class ImagenpublicidadComponent implements OnInit {

  constructor( public modalService: ModalDonacionesService) { }

  ngOnInit(): void {
  }

  abrirModal(){
    this.modalService.abrirModal();
  }

}
