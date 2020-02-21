import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(
      success => {
        this.userDetails = success['user'];
      },
      err =>{}
    )
  }

}
