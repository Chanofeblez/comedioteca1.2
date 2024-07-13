import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaisComponent } from './pages/pais/pais.component';
import { ComedianteComponent } from './pages/comediante/comediante.component';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { ArtistasComponent } from './pages/artistas/artistas.component';
import { VideosComponent } from './pages/videos/videos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: 'artistas', component: ArtistasComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'contactar', component: ContactoComponent },
  { path: 'podcast/:id', component: ContactoComponent },
  { path: 'buscar', component: PaisComponent },
  { path: 'comediante/:id', component: ComedianteComponent },
  { path: 'checkout/:id', component: CheckoutPageComponent},
  { path: '**', redirectTo: '/home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
