import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit, OnDestroy {
  isFormSubmitted: boolean = false;
  studentdata: any;
  httpClient = inject(HttpClient);
  id: any;
  stucode: any;
  private subscription?: Subscription;

  constructor(
    private datservice: DataServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.url='https://localhost:44351/api/Contact';
  }

  StudentForm = new FormGroup({
    studentcode: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    mobile: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    NIC: new FormControl('', [Validators.required]),
    Dob: new FormControl(''),
    address: new FormControl(''),
  });

  ngOnInit(): void {
    // this.fetchContacts();
    // this.onSubmit();

    this.id = this.route.snapshot.params['Id'];
    this.stucode = this.route.snapshot.params['StudentCode'];
    //var id = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.id != undefined) {
      this.loadData(this.id, this.stucode);
    }
  }

  loadData(id: any, StudentCode: string) {
    // var id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.datservice.getStudentbyId(id).subscribe({
      next: (value) => {
        debugger;
        this.studentdata = value[0];
        console.log(this.studentdata);
        var dobdt = formatDate(value[0].dob, 'yyyy-MM-dd', 'en-US');
        this.StudentForm.setValue({
          studentcode: this.studentdata.studentCode,
          firstName: this.studentdata.firstName,
          lastName: this.studentdata.lastName,
          mobile: this.studentdata.mobile,
          email: this.studentdata.email,
          NIC: this.studentdata.nic,
          Dob: dobdt,
          address: this.studentdata.address,
        });
      },
    });
  }

  // }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onClear(): void {
    this.StudentForm = new FormGroup({
      studentcode: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      NIC: new FormControl(''),
      Dob: new FormControl(''),
      address: new FormControl(''),
    });
  }
  onNavigate() {
    this.router.navigate(['/StudentList']).then(() => {
      window.location.reload();
    });
  }
  onFormSubmit() {
    this.id =
      this.id === undefined ? '00000000-0000-0000-0000-000000000000' : this.id;

    const addStudentRequest = {
      Id: this.id,
      studentcode: this.StudentForm.value.studentcode,
      firstname: this.StudentForm.value.firstName,
      lastName: this.StudentForm.value.lastName,
      mobile: this.StudentForm.value.mobile,
      email: this.StudentForm.value.email,
      NIC: this.StudentForm.value.NIC,
      Dob:
        this.StudentForm.value.Dob == ''
          ? formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
          : this.StudentForm.value.Dob,
      address: this.StudentForm.value.address,
    };
    const isFormValid = this.StudentForm.valid;

    this.isFormSubmitted = true;
    this.StudentForm.markAsTouched();
    if (isFormValid) {
      debugger;
      if (this.id == '00000000-0000-0000-0000-000000000000') {
        this.subscription = this.datservice
          .addStudent(addStudentRequest)
          .subscribe((data: any) => {
            this.router.navigate(['/StudentList']).then(() => {
              window.location.reload();
            });

            alert('Record Succesfully Saved');
          });
      } else {
        debugger;
        this.subscription = this.datservice
          .updateStudents(this.id, addStudentRequest)
          .subscribe((data: any) => {
            this.router.navigate(['/StudentList']).then(() => {
              window.location.reload();
            });

            alert('Record Succesfully Updated');
          });
      }
    }
  }
}
