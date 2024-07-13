import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalDonacionesService } from '../../services/modal-donaciones.service';
import {RestService} from "../../services/rest.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-donacion',
  templateUrl: './modal-donacion.component.html',
  styleUrls: ['./modal-donacion.components.css']
})
export class ModalDonacionComponent implements OnInit {  

  public form: FormGroup = new FormGroup({});
  
  localizator: string = "";
  primero=true;    
  
  constructor(public modalService: ModalDonacionesService,
              private restService: RestService, 
              private fb: FormBuilder,
              private router: Router,
              //private toaster: Toaster,
              private cd: ChangeDetectorRef,
              private route: ActivatedRoute) {                 
              }

              ngOnInit(): void {

                console.log("checkout cargado");
                //this.id = this.route.snapshot.paramMap.get('id') || '';
                //console.log(this.id);
                this.form = this.fb.group({
                  name: ['', [Validators.required]],
                  amount: ['', [Validators.required, Validators.min(5)]],                  
                });
                console.log("checkout2 cargado");    

              }

              init(): void {
                console.log(this.primero);
                try {                 
                  this.restService.generateOrder(this.form.value)
                    .subscribe(({data}) => {
                      
                     // this.modalService.cerrarModal();
                      console.log(data.localizator);
                      this.localizator = data.localizator;
                      console.log(this.localizator);
                      this.primero = false;
                      console.log(this.primero);
                      //this.router.navigate(['podcast', data?.localizator]);
                      
                    })
                } catch (e) {
                  console.log("Algo ocurrio");
                 // this.toaster.open({text: 'Algo ocurrio', caption: 'ERROR'})
                 Swal.fire({
                  icon: 'info',
                  title: 'ERROR',
                  text: 'Algo ocurrio mientras procesaba el pago',
                  footer: '<a href="">Why do I have this issue?</a>'
                })
                }
              } 
              
              cambiarEstado(e:boolean){
                console.log(e);
                this.primero = e;
                console.log(e);
              }


 cerrarModal() {
   this.primero = true;
   this.modalService.cerrarModal();
 }




}
