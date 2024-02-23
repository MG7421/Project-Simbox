import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UIModule } from '../shared/ui/ui.module';
import { AuthRoutingModule } from './auth/auth-routing';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    UIModule,
    AuthRoutingModule,
    CarouselModule
  ]
})
export class AccountModule { }
