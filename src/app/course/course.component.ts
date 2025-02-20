import { Component } from '@angular/core';
import { AccordianComponent } from '../widgets/accordian/accordian.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [AccordianComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {}
