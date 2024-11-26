import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigartion',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './navigartion.component.html',
  styleUrl: './navigartion.component.css'
})
export class NavigartionComponent {
  menuValue:boolean=false;
  menu_icon :string ='bi bi-list';
 
  
 
// constructor(private service:ServiceService,public dialog:MatDialog){
//   this.dataSource=new MatTableDataSource();
//   }
  openMenu(){
     this.menuValue =! this.menuValue ;
     this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
   }
  closeMenu(){
    this.menuValue=false;
    this.menu_icon='bi bi-list';
  }
}
