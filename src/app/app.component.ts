import { Component } from '@angular/core';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipease';
  
  constructor(private userService : UserService, private router: Router){

  }

  public get loggedIn(): boolean {
    return this.userService.isSignedIn();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("")
  }
}
