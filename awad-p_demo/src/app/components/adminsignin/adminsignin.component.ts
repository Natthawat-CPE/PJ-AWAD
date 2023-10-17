import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminsService } from 'src/app/services/admins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminsignin',
  templateUrl: './adminsignin.component.html',
  styleUrls: ['./adminsignin.component.css']
})
export class AdminsigninComponent implements OnInit{
  adminData = new FormGroup({
    Admin_Name: new FormControl(''),
    Password: new FormControl('')
  })

  constructor(
    private adminService: AdminsService,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  AdminSignin() {
    console.log("start signin");
    this.adminService.AdminSignin(this.adminData.value).subscribe(
      data => {
        console.log(data)
        this.adminData.reset();
        localStorage.setItem('token', data.token)
        localStorage.setItem('adminId', data.result.id);
        localStorage.setItem('role', 'Admin');
        this.router.navigate(['/home/admin']);
        console.log("code work");
        alert('Sign-In successfully !!!');
      },
      err => {
        console.log(err);
        alert('Cannot Sign-In  !!!');
      }
    );
  }
}
