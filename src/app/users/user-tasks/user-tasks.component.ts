import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  private usersService = inject(UsersService);

  // // 1: Verkrijg dynamische Route Parameters via Input (met withComponentInputBinding() in app.config).
  // userId = input.required<string>();

  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);


  // 2: Verkrijg dynamische Route Parameters via Observables.
  userName = '';
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscribtion = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => { 
        this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
      }
    });
    this.destroyRef.onDestroy(() => subscribtion.unsubscribe());
  }
}
