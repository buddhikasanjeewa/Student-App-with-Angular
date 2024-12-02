import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,RouterOutlet,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {

isFormSubmitted:boolean=false;
studentdata:any;
httpClient=inject(HttpClient);
 id: any;
 stucode:any;

constructor(private datservice:DataServiceService, private router : Router,private route: ActivatedRoute){
 // this.url='https://localhost:44351/api/Contact';

}


StudentForm=new FormGroup(
  {
studentcode:new FormControl("",[Validators.required]),
firstName:new FormControl("",[Validators.required]),
lastName:new FormControl("",[Validators.required,Validators.minLength(4)]),
mobile:new FormControl("",[Validators.required]),
email:new FormControl("",[Validators.required,Validators.email]),
NIC:new FormControl("",[Validators.required]),
Dob:new FormControl(""),
address:new FormControl("")

  })




ngOnInit():void{
 // this.fetchContacts();
 // this.onSubmit();

this.id=this.route.snapshot.params['Id'];
this.stucode= this.route.snapshot.params['StudentCode'];
 //var id = parseInt(this.route.snapshot.paramMap.get('id'));
 if(this.id!=undefined)
 {

 this.loadData(this.id,this.stucode);
 }
}


loadData(id: any,StudentCode: string)
 {

  // var id = parseInt(this.route.snapshot.paramMap.get('id'));
   this.datservice.getStudentbyId(id,StudentCode).subscribe({
    next:(value)=>{
      
    this.studentdata=value;
     console.log(this.studentdata);
   var dobdt=  formatDate(value.dob,'yyyy-MM-dd',"en-US");
     this.StudentForm.setValue({
       studentcode: value.studentCode,
       firstName: value.firstName,
       lastName: value.lastName,
       mobile: value.mobile,
       email: value.email,
       NIC: value.nic,    
       Dob: dobdt,
       address: value.address
     });
    

  }
  });

     }

  

    // }

onClear():void{
  this.StudentForm=new FormGroup(
    {
      studentcode:new FormControl(""),
      firstName:new FormControl(""),
      lastName:new FormControl(""),
      mobile:new FormControl(""),
      email:new FormControl(""),
      NIC:new FormControl(""),
      Dob:new FormControl(""),
      address:new FormControl("")
  
    });
}
onNavigate()
{
  this.router.navigate(['/StudentList'])
  .then(() => {
    window.location.reload();
  });
}
onFormSubmit(){
  this.id=this.id===undefined?"00000000-0000-0000-0000-000000000000":this.id;
  
  
  const addStudentRequest={
    Id:this.id,
    studentcode:this.StudentForm.value.studentcode,
    firstname:this.StudentForm.value.firstName,
    lastName:this.StudentForm.value.lastName,
    mobile:this.StudentForm.value.mobile,
    email:this.StudentForm.value.email,
    NIC:this.StudentForm.value.NIC,
    Dob:this.StudentForm.value.Dob==''?formatDate(new Date(),'yyyy-MM-dd',"en-US"):this.StudentForm.value.Dob,
    address:this.StudentForm.value.address

  }
  const isFormValid=this.StudentForm.valid;

  this.isFormSubmitted=true;
  this.StudentForm.markAsTouched();
  if(isFormValid)
{
debugger;
  if(this.id=="00000000-0000-0000-0000-000000000000")
  {
  
  this.datservice.addStudent(addStudentRequest).subscribe((data:any)=>{
   
  this.router.navigate(['/StudentList'])
  .then(() => {
    window.location.reload();
  });

alert("Record Succesfully Saved");
});
  }
  else{
    debugger;
    this.datservice.updateStudents(this.id,this.stucode,addStudentRequest).subscribe((data:any)=>{
   
      this.router.navigate(['/StudentList'])
      .then(() => {
        window.location.reload();
      });
    
    alert("Record Succesfully Updated");
  })

  

}
}

}
  


}
