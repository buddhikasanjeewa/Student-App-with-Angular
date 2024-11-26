import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit  {
  id: any;
  student: any;
  stucode:any;
  
  fetchParamters(){
    
    this.id=this.route.snapshot.params['Id'];
this.stucode= this.route.snapshot.params['StudentCode'];
  }

  constructor(private datservice:DataServiceService,private route: ActivatedRoute, private router : Router){
    
    //this.fetchParamters();
    //this.loadData(this.id,this.stucode);
   
  }
    ngOnInit() {
      this.fetchParamters();
     
      this.loadData(this.id,this.stucode);
}
onNavigate(){
  this.router.navigate(['/StudentList'])
  .then(() => {
    window.location.reload();
  });
  return false;
}
loadData(id: any,StudentCode: string)
{

  // var id = parseInt(this.route.snapshot.paramMap.get('id'));


   
   this.datservice.getStudentbyId(this.id,this.stucode).subscribe({
     next:(value)=>{
      debugger;

   this.student=value;
    console.log(this.student);
    this.student.dob=  formatDate(value.dob,'yyyy-MM-dd',"en-US");
    
     }

  

})
}

}
