import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  errorMessages: string;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email:["demo@demo.com", [Validators.required, Validators.email]],
      password:["demo1234", [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.userService.signIn(this.signInForm.value).subscribe(
      success => {
        this.userService.setToken(success['token']);
        this.router.navigateByUrl('/profile');
      },
      err => {
        this.errorMessages = err.error.message;
      }
    )
  }

}
