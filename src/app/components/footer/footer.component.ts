import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MensajeService } from '../../services/mensaje.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {

  public formSubmitted = false;

  public crearMensajeForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['']
  });

  year = new Date().getFullYear();

  constructor(private fb: FormBuilder,
              private mensajeService: MensajeService) { }

  crearMensaje(){
    this.formSubmitted = true;
    console.log( this.crearMensajeForm.value );

    if( this.crearMensajeForm.invalid ) {
     return;
    } 

    //Crear mensaje
    this.mensajeService.crearMensaje( this.crearMensajeForm.value )
               .subscribe( resp => {
                 console.log('mensaje Creado')
                 console.log(resp)
               }, (err) => {
                 Swal.fire('Error', err.error.errors.email.msg, 'error' );
               });
  }

  campoNoValido( campo: string ): boolean {
    
    if( this.crearMensajeForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

 

}
