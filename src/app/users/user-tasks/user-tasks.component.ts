import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // private usersService = inject(UsersService);

  // // 1: Verkrijg dynamische Route Parameters via Input (met withComponentInputBinding() in app.config).
  // userId = input.required<string>();

  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);


//   // 2: Verkrijg dynamische Route Parameters via Observables.
//   userName = '';
//   message = input.required<string>();
//   private activatedRoute = inject(ActivatedRoute);
//   private destroyRef = inject(DestroyRef);

//   ngOnInit(): void {
//     console.log('Input data from app.routes: ' + this.message());
//     console.log(this.activatedRoute);
//     const subscribtion = this.activatedRoute.paramMap.subscribe({
//       next: (paramMap) => { 
//         this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
//       }
//     });
//     this.destroyRef.onDestroy(() => subscribtion.unsubscribe());
//   }
// }


// 3: Verkrijg data via de router - resolver functie
  userName = input.required<string>();
  message = input.required<string>();
  
  // private activatedRoute = inject(ActivatedRoute);
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data);
  //     }
  //   })
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
}
