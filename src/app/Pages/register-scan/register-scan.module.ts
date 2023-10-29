import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterScanPageRoutingModule } from './register-scan-routing.module';

import { RegisterScanPage } from './register-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterScanPageRoutingModule
  ],
  declarations: [RegisterScanPage]
})
export class RegisterScanPageModule {}
