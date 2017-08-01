import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController  } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http,RequestOptions,Headers} from '@angular/http';
import{User} from '../../model/user.model';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@IonicPage()
@Component({
  selector: 'page-after-login',
  templateUrl: 'after-login.html',
})
export class AfterLoginPage {

userId:number;
fromUserId:number;
  rootPage = HomePage;
  result:any;
  baseUrl:string;
  alluserArray=new Array<User>();
  public user:any;
  token:string;
  messages:any;
  messageContent:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public menu:MenuController) {
    this.user=navParams.get('token');
    this.token=this.user.token;
    this.userId=this.user.id;
    this.baseUrl='http://chat.promactinfo.com/api';

this.getUserList();
Observable.interval(1000)
      .subscribe(() => {
      this.updateValue();
      });
}



getUserList()
{
  let myHeaders=new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let myParams=new URLSearchParams();
  myHeaders.append('Authorization',this.token);
  let option=new RequestOptions({headers:myHeaders,params:myParams});
 this.http.get(this.baseUrl+'/user',option).subscribe(res =>{
   if(res!=null)
   {
      this.result=res.json();
      let promise=this.result;
       this.alluserArray.push(promise);
   }
    });
   
  }
  selectedUser :User=new User();
  foo(name:string, id:number)
  {
    this.fromUserId=id;
    this.selectedUser.name=name;
    this.selectedUser.id=id;
    this.menu.close();

    let myHeaders=new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let myParams=new URLSearchParams();
  myHeaders.append('Authorization',this.token);
  let option=new RequestOptions({headers:myHeaders,params:myParams});
    this.http.get(this.baseUrl+'/chat/'+id,option).subscribe(res=>{
      if(res!=null)
      {
      this.messages=res.json();
      }
    });
  }

  onEnter(text:string)
  {
    let myHeaders=new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let myParams=new URLSearchParams();
  myHeaders.append('Authorization',this.token);
  let option=new RequestOptions({headers:myHeaders,params:myParams});

let messageSend={"message":text,"toUserId":this.fromUserId};
  this.http.post(this.baseUrl+'/chat',messageSend,option).subscribe();
  this.http.get(this.baseUrl+'/chat/'+this.fromUserId,option).subscribe(res=>{
      if(res!=null)
      {
      this.messages=res.json();
      }
    });
    this.messageContent="";
}
updateValue()
{
  let value=this.fromUserId;
  let myHeaders=new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let myParams=new URLSearchParams();
  myHeaders.append('Authorization',this.token);
  let option=new RequestOptions({headers:myHeaders,params:myParams});
  if(this.fromUserId!=undefined && this.fromUserId!=null)
  {
  this.http.get(this.baseUrl+'/chat/'+this.fromUserId,option).subscribe(res=>{
      if(res!=null)
      {
      this.messages=res.json();
      }
    });
  }
}
}

