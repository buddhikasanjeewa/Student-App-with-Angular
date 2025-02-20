import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordian',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordian.component.html',
  styleUrl: './accordian.component.css',
})
export class AccordianComponent {
  @Input() headerText: string = '';
  @Input() accoColor: string = '';
  isAccordianOpen: boolean = false;

  constructor() {}
}
