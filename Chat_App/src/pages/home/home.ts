import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {User} from '../../model/user.model';
import{AfterLoginPage} from '../../pages/after-login/after-login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user:User;
  private result:any;
  public baseUrl:string;
  constructor(public navCtrl: NavController,public http:Http) {
    this.baseUrl='http://chat.promactinfo.com/api';
  }
  
  async logIn(userName:string)
  {
    this.user=new User();
    let promise={name:userName};
    await this.http.post(this.baseUrl + '/user/login',promise).subscribe(res=>{
      if(res!=null)
      {
      this.result=res.json();
      this.navCtrl.setRoot(AfterLoginPage,{token:this.result});
      }
    });
    // console.log(this.user.token);
      
  }
}
