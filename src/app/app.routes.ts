import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

// Toegang bepalen met Route Guard
const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent
  },
  {
    path: 'users/:userId', // /users/<uid>
    component: UserTasksComponent,
    children: [ 
      {
        path: '',
        redirectTo: 'tasks', // Voegt /tasks toe aand bijv. /users/u3 
        pathMatch: 'prefix'
      },
      {
        path: 'tasks', // /users/<uid>/tasks
        component: TasksComponent
      },
      {
        path: 'tasks/new', // /users/<uid>/tasks/new
        component: NewTaskComponent
      }
    ],
    // Route Guard:
    canMatch: [dummyCanMatch],
    // Statische data
    data: {
      message: 'Hello!'
    },
    // Dynamische data
    resolve: {
      userName: resolveUserName
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
