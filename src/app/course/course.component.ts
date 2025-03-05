import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccordianComponent } from '../widgets/accordian/accordian.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    AccordianComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  courses: any = [];
  Notification: any = [];
  ngOnInit(): void {
    this.getCourseTypes();
    // throw new Error('Method not implemented.');
  }

  constructor(private datservice: DataServiceService) {}
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  getCourseTypes() {
    debugger;

    this.subscription = this.datservice.getCourseType().subscribe({
      next: (value) => {
        debugger;
        this.courses = value;
      },
    });
  }
}
