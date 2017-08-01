import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AfterLoginPage } from './after-login';

@NgModule({
  declarations: [
    AfterLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AfterLoginPage),
  ],
})
export class AfterLoginPageModule {}
