import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  currentUser:any={};
  sendData:any={};

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser,"this.currentUser")
  }
  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { }

  reset() {

    if(this.model.newPassword==this.model.confirmPassword){
    console.log(this.model,"ddfj");
    //this.sendData._id=this.currentUser._id;
  //  this.sendData.username=this.currentUser.username;
    this.currentUser.currentPassword=this.model.currentPassword;
    this.currentUser.newPassword=this.model.newPassword;
    console.log(this.currentUser,"this.currentUser")
    this.loading = true;
    this.userService.reset(this.currentUser)
        .subscribe(
            data => {
                this.alertService.success('Reset password is successful', true);
                //this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

    }else{
      this.alertService.error("passwords are not matching");
    }
      // this.loading = true;
      // this.userService.create(this.model)
      //     .subscribe(
      //         data => {
      //             this.alertService.success('Registration successful', true);
      //             this.router.navigate(['/login']);
      //         },
      //         error => {
      //             this.alertService.error(error);
      //             this.loading = false;
      //         });
  }


}
