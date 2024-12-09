import { Routes } from "@angular/router";

import { TaskComponent } from "./tasks/task/task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

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
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
