import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterScanPage } from './register-scan.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterScanPageRoutingModule {}
