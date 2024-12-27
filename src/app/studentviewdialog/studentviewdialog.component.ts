import { Component, inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Student } from '../../Models/Student';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-studentviewdialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './studentviewdialog.component.html',
  styleUrl: './studentviewdialog.component.css',
})
export class StudentviewdialogComponent {
  id: any;
  student: Student[] = [];
  stucode: any;
  dobstring: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<StudentviewdialogComponent>
  ) {
    debugger;
    this.student = inject(MAT_DIALOG_DATA);
    this.dobstring = formatDate(this.student[0].dob, 'yyyy-MM-dd', 'en-US');
  }

  closeDialog(): void {
    debugger;
    this.dialogRef.close();
  }
  onNavigate() {
    this.router.navigate(['/StudentList']).then(() => {
      window.location.reload();
    });
    return false;
  }
}
