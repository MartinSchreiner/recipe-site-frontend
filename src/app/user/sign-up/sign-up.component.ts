import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  success: boolean;
  error: string;
  signUpForm: FormGroup;

  constructor(private userService: UserService, private fb:FormBuilder) { }

  ngOnInit() {

    this.signUpForm = this.fb.group({
      fullName:["", [Validators.required]],
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit(){
    console.log('OnSubmit called')
    this.userService.postUser(this.signUpForm.value).subscribe(
      res => {this.success = true;},
      err => {this.error = err.error.message;}
    )
  }

}
