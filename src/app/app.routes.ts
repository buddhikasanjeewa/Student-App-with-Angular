import { Routes } from '@angular/router';
import { NavigartionComponent } from './navigartion/navigartion.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentviewdialogComponent } from './studentviewdialog/studentviewdialog.component';

export const routes: Routes = [
    {path:'Navigation',component:NavigartionComponent},
    {path:'StudentList',component:StudentListComponent},
    {path:'Student',component:StudentComponent},
    {path:'Student/:Id/:StudentCode',component:StudentComponent},
    {path:'StudentDetails/:Id/:StudentCode',component:StudentDetailsComponent}
    
];   
