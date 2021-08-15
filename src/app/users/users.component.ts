import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,) { }
  public users: any = [];
  ngOnInit(): void {
    this.findAllUsers()
    // localStorage.getItem('user')

  }


  findAllUsers() {
    this.userService.findAllUsers().subscribe(res => {
      let users: any = res;
      this.users = users.data;
    }, err => {
      console.log('err ', err)
    })
  }

  destroyUser(code: any) {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Esta accion no se puede revertir posteriormente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.destroy(code).subscribe(res => {
          this.users = [];
          this.toastr.success('Usuario eliminado correctamente!', 'usuario!', {
            timeOut: 5000
          });
          this.findAllUsers();

        }, err => {
          this.toastr.warning('Error al eliminar el usuario!', 'Usuario!', {
            timeOut: 5000
          });
        })
      } else {
        console.log('not confirmed')
      }
    })
  }
}
