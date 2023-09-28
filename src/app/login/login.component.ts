import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
 
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
      
    })

  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password,
      }

    this.userService.login(data).subscribe((response: any) => { 
      console.log("Inside login.ts response");
      this.ngxService.stop();
      this.dialogRef.close();
       //console.log("Token form userService  login : ", JSON.stringify(response));

       //console.log(response.headers.get('Authorization'));
     // alert(localStorage.setItem('name', 'Matt West'));
       //var x = localStorage.getItem("mytime");
      //console.log(localStorage.setItem("mytime", "current-Time"));
      //console.log(localStorage.setItem("name", 'Sapana Vinayak More'));//JSON.stringify(model)
      console.log((localStorage.setItem('token',response)));
      console.log("I cam at to route the web to cafe/dashboard");
       this.router.navigate(['/cafe/dashboard']);
    }, (error) => {
      console.log("Inside login.ts Error",error);

      this.ngxService.stop();
      
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

}
