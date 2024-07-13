import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowRef } from "../../WindowRef"
import { environment } from '../../../environments/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../services/rest.service';
//import {Toaster} from "ngx-toast-notifications";
import Swal from 'sweetalert2';
import { ModalDonacionesService } from '../../services/modal-donaciones.service';



declare global{
  interface Window{
    Stripe?: any;
  }
 }

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  @Input('id') id = "";
  @Output() primero = new EventEmitter();

  private readonly STRIPE! : any;
  private elementStripe!: any;
  cardNumber: any;
  cardCvv: any;
  cardExp: any;
  form: FormGroup = new FormGroup({});
  //id!: string;
  orderData!: any;

  constructor(public modalService: ModalDonacionesService,
              private fb : FormBuilder,
              //private toaster: Toaster,
              private cd: ChangeDetectorRef,
              private restService: RestService,
              private route: ActivatedRoute) {
    //this.STRIPE = window.Stripe(environment.stripe_pk);
    //console.log("stripe ID", environment.stripe_pk);
    console.log("stripe", this.STRIPE);
  }

  ngOnInit(): void {
    console.log("checkout cargado");
    //this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id);
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.max(100000000)]],
      cardNumber: [false, [Validators.required, Validators.requiredTrue]], // true||false
      cardCvv: [false, [Validators.required, Validators.requiredTrue]], // true||false
      cardExp: [false, [Validators.required, Validators.requiredTrue]], // true||false
    })

    this.loadDetail();
    this.createStripeElement()
  }

  loadDetail(): void {
    this.restService.getOrderDetail(this.id).subscribe(({data}) => {
      this.orderData = data;
      console.log("loadDetail cargado");
      console.log(this.orderData);
      if (data.status.includes('succe')) {
        this.form.disable();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '🔴 Error con orden',
            footer: '<a href="">Why do I have this issue?</a>'
       })
       // this.toaster.open({
       //   text: '🔴 Error con orden',
       //   caption: 'Ya se ha pagado'
       // });
      }
      this.form.patchValue({
        amount: data.amount
      })
    })
  }

  private createStripeElement = () => {
    const style = {
      base: {
        color: '#000000',
        fontWeight: 400,
        fontFamily: '\'Poppins\',sans-serif',
        fontSize: '20px',
        '::placehorder':{
          color:'#E3E2EC'
        },
      },
      invalid: {
        color: '#dc3545'
      }
    };

    //SDK de Stripe: Inicia la generacion de elementos
    this.elementStripe = this.STRIPE.elements({
      font: [
        {
          cssSrc:
          'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap',
        },
      ],
    });

    //SDK Contruimos los inputs de targeta, cvc, fecha con estilos
    const cardNumber = this.elementStripe.create( 'cardNumber', {
      placeholder: '0000 0000 0000 0000',
      style,
      classes:{
        base: 'input-stripe-custom'
      },
    });

    const cardExp = this.elementStripe.create( 'cardExpiry', {
      placeholder: 'MM/AA',
      style,
      classes:{
        base: 'input-stripe-custom'
      },
    });

    const cardCvc = this.elementStripe.create( 'cardCvc', {
      placeholder: '000',
      style,
      classes:{
        base: 'input-stripe-custom'
      },
    });

    //SDK Montamos los elementos en nuestro DIV identificados con el #id
    cardNumber.mount('#card');
    cardExp.mount('#exp');
    cardCvc.mount('#cvc');

    this.cardNumber = cardNumber;
    console.log("1",this.cardNumber);
    this.cardExp = cardExp;
    this.cardCvv = cardCvc;

    //Escuchamos los eventos del SDK
    this.cardNumber.addEventListener('change', this.onChangeCard.bind(this));
    this.cardExp.addEventListener('change', this.onChangeExp.bind(this));
    this.cardCvv.addEventListener('change', this.onChangeCvv.bind(this));
  }

  async initPay(): Promise<any> {
    try {
      this.form.disable();
      // SDK de Stripe genera un TOKEN para la intencion de pago!
      const {token} = await this.STRIPE.createToken(this.cardNumber)
      console.log("token creado", token);
      console.log(this.cardNumber);


      // Enviamos el token a nuesta api donde generamos (stripe) un metodo de pago basado en el token
      // tok_23213
      console.log("enviando pago");
      console.log(token.id);
      console.log(this.id);
      const {data} = await this.restService.sendPayment(token.id, this.id);
      console.log("pago enviado", data);

      // Nuestra api devolver un "client_secret" que es un token unico por intencion de pago
      // SDK de stripe se encarga de verificar si el banco necesita autorizar o no
      console.log("usaremos el CS");
      this.STRIPE.handleCardPayment(data.client_secret)
        .then(async () => {
          console.log("usando el CS");
          // 👌 Money Money!!!
          //this.toaster.open({text: 'Dinerito dineron', caption: 'Yeah!', type: 'success'})
          Swal.fire({
            icon: 'success',
            title: 'Yeah!',
            text: 'Dinerito dineron',
            footer: '<a href="">Why do I have this issue?</a>'
          })

          // Enviamos el id "localizador" de nuestra orden para decirle al backend que confirme con stripe si es verdad!
          console.log("Doble chequeo con el backend");
          await this.restService.confirmOrder(this.id)
        })
        .catch(() => {
          //this.toaster.open('Error con el pago')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error con el pago',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        })
    } catch (e) {
      //this.toaster.open({text: 'Algo ocurrio mientras procesaba el pago', caption: 'ERROR', type: 'danger'})
      Swal.fire({
        icon: 'info',
        title: 'ERROR',
        text: 'Algo ocurrio mientras procesaba el pago',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }

    this.primero.emit(true);
    this.modalService.cerrarModal();

  }

  //Manejadores de validacion de input de Stripe
  onChangeCard({error}: any) {
    this.form.patchValue({cardNumber: !error});
  }

  onChangeCvv({error}: any) {
    this.form.patchValue({cardCvv: !error});
  }

  onChangeExp({error}: any) {
    this.form.patchValue({cardExp: !error});
  }

}
