import { Routes } from "@angular/router";
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { SearchComponent } from './search/search/search.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';


export const appRoutes: Routes = [
    {
        path:'signup', component: UserComponent,
        children: [
          {
            path: '', component: SignUpComponent
          }
        ]
    },
    {
      path:'signin', component: UserComponent,
      children: [
        {
          path: '', component: SignInComponent
        }
      ]
    },
    {
      path: '', component: SearchComponent
    },
    {
      path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]
    },
    {
      path: 'myRecipes', component: MyRecipesComponent, canActivate: [AuthGuard]
    },
    {
      path:'**', redirectTo: '', pathMatch:'full'
    },

    
]

