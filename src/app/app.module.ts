import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PaisComponent } from './pages/pais/pais.component';
import { ComedianteComponent } from './pages/comediante/comediante.component';
import { PosterGridComponent } from './components/poster-grid/poster-grid.component';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { ArtistasComponent } from './pages/artistas/artistas.component';
import { VideosComponent } from './pages/videos/videos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { BannerComponent } from './components/banner/banner.component';
import { VideosCarruselComponent } from './components/videos-carrusel/videos-carrusel.component';
import { ArtistascarruselComponent } from './components/artistascarrusel/artistascarrusel.component';
import { ImagenpublicidadComponent } from './components/imagenpublicidad/imagenpublicidad.component';
import { ImagencanalesComponent } from './components/imagencanales/imagencanales.component';
import {  NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDonacionComponent } from './components/modal-donacion/modal-donacion.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PaisComponent,
    ComedianteComponent,
    PosterGridComponent,
    AcercaComponent,
    ArtistasComponent,
    VideosComponent,
    ContactoComponent,
    PodcastComponent,
    BannerComponent,
    VideosCarruselComponent,
    ArtistascarruselComponent,
    ImagenpublicidadComponent,
    ImagencanalesComponent,
    ModalDonacionComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
