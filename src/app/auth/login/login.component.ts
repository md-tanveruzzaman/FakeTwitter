import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router
  ) { }

  onSubmit(formGroup: FormGroup) {
    if (formGroup.status !== 'VALID') {
      this.toastr.error("Fields are Required!")
      return;
    }

    console.log(formGroup)
  }
}
