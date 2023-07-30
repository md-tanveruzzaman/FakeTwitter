import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Signup } from 'src/app/interfaces/Account.interfaces';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router
  ) { }

  onSubmit(formGroup: FormGroup) {
    this.router.navigate(['/login']);
    if (formGroup.status !== 'VALID') {
      this.toastr.error("Fields are Required!")
      return;
    }

    const newUser: Signup = formGroup.value;
    this.accountService.register(newUser)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message) {
            this.toastr.success(res.message);
            this.router.navigate(['/auth/login']);
          }
          else this.toastr.error(res.error ? res.error : "Something went wrong!");
        },
        error: error => {
          this.toastr.error("Something went wrong!")
        }
      })
  }

}
