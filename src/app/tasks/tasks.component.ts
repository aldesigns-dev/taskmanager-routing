import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})

// // Gebruik van Input Signals:
// export class TasksComponent {
//   private tasksService = inject(TasksService);
//   // Toegang tot parent route data: withRouterConfig() in app.config. 
//   userId = input.required<string>();
//   // Query parameter "order". Automatisch input binding withComponentInputBinding()
//   order = input<'asc' | 'desc'>(); 
//   userTasks = computed(() => 
//     this.tasksService.allTasks().filter(task => task.userId === this.userId())
//   );
// }

// // Gebruik van Observables:
// export class TasksComponent implements OnInit {
//   private tasksService = inject(TasksService); 
//   userId = input.required<string>();
//   order?: 'asc' | 'desc';
//   userTasks = computed(() => 
//     this.tasksService.allTasks().filter(task => task.userId === this.userId())
//   );

//   private activatedRoute = inject(ActivatedRoute);
//   private destroyRef = inject(DestroyRef);

//   ngOnInit(): void {
//     const subscription = this.activatedRoute.queryParams.subscribe({
//       next: (params) => (this.order = params['order']),
//     });
//     this.destroyRef.onDestroy(() => subscription.unsubscribe());
//   }
// }

export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService); 
  userId = input.required<string>();
  order = signal<'asc' | 'desc'>('desc');
  userTasks = computed(() => 
    this.tasksService 
    .allTasks()
    .filter(task => task.userId === this.userId())
    .sort((a, b) => {
      if (this.order() === 'desc') {
        return a.id > b.id ? -1 : 1
      } else {
        return a.id > b.id ? 1 : -1
      }
    })
  );

  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.order.set(params['order'])),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}