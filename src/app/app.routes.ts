import { Routes } from '@angular/router';
import { NavigartionComponent } from './navigartion/navigartion.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
  { path: 'Navigation', component: NavigartionComponent },
  { path: 'StudentList', component: StudentListComponent },
  { path: 'Student', component: StudentComponent },
  { path: 'Student/:Id', component: StudentComponent },
];
