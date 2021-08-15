import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  public createUserForm: FormGroup; /* create form group  */
  public errorValid = false;
  public message = {}
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router) {
    this.createUserForm = this.formAddUser();
  }

  formAddUser() {
    return this.formBuilder.group({
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      age: ["", [Validators.required]],
    });
  }


  ngOnInit(): void {

  }


  createUser(event: Event) {
    event.preventDefault();
    console.log(this.createUserForm.valid)
    console.log(this.createUserForm.value)

    if (this.createUserForm.valid) {
      this.userService.create(this.createUserForm.value).subscribe(res => {
        this.toastr.success('Usuario creado correctamente!', 'usuario!', {
          timeOut: 5000
        });
        this.goBack();
      }, err => {
        this.toastr.warning('Error al crear el usuario!', 'Usuario!', {
          timeOut: 5000
        });
      })
    } else {
      this.errorValid = true;
      this.message = { error: 'Debe de llenar los campos necesarios para crear un nuevo proveedor...' }
    }
  }

  goBack() {
    this.router.navigate(['/users'])
  }
}
