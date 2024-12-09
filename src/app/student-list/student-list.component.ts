import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CommonModule,
  DATE_PIPE_DEFAULT_OPTIONS,
  formatDate,
} from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DataServiceService } from '../data-service.service';
// import { DataTablesModule } from 'angular-datatables';
// import DataTables, { Config } from 'datatables.net';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';

import { Student } from '../../Models/Student';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { StudentviewdialogComponent } from '../studentviewdialog/studentviewdialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTable,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);

  students: Student[] = [];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  private subscription?: Subscription;
  displayedColumns = [
    'studentCode',
    'firstName',
    'lastName',
    'mobile',
    'email',
    'NIC',
    'edit',
    'delete',
    'view',
  ];

  constructor(
    private datservice: DataServiceService,
    private router: Router,
    private dialogRef: MatDialogRef<StudentviewdialogComponent>
  ) {
    //const students: Student[] = [];

    this.getStudents();

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.students);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  openTaskDialog(id: any, stucode: string) {
    debugger;
    this.loadData(id, stucode);
    this.datservice.url = 'https://localhost:7120/api/StudentApi';
  }

  loadData(id: any, StudentCode: string) {
    debugger;
    // var id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.datservice
      .getStudentbyId(id, StudentCode)
      .subscribe({
        next: (value) => {
          debugger;
          this.students = value;
          console.log(this.students[0]);
          let dialogRef = this.dialog.open(StudentviewdialogComponent, {
            data: [this.students[0]],
            height: '400px',
            width: '500px',
          });
        },
      });
  }

  public deleteStudents(id: any, index: any, StudentCode: string) {
    debugger;
    if (confirm('Are you sure to delete?')) {
      this.subscription = this.datservice
        .deleteStudents(id, index, StudentCode)
        .subscribe((data: any) => {
          debugger;

          alert('Record Succesfully deleted');
          this.datservice.url = 'https://localhost:7120/api/StudentApi';
          // this.router.navigate(['/contactList']);
          this.students.splice(index, 1);
          this.Navigate(1);
          this.setDataSource();
        });
    }
  }

  Navigate(type: number) {
    if (type == 1) {
      this.router.navigate(['/StudentList']);
    } else if (type == 2) {
      this.router.navigate(['/Student']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  setDataSource() {
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter) ||
        data.mobile.includes(filter) ||
        data.studentCode.includes(filter) ||
        data.email.includes(filter)
      );
    };
  }
  getStudents() {
    debugger;

    this.subscription = this.datservice.getStudents().subscribe({
      next: (value) => {
        debugger;

        this.students = value;
        console.log(this.students);
        this.setDataSource();
      },
    });
  }
  ngOnInit(): void {
    // Assign the data to the data source for the table to render
  }
}
