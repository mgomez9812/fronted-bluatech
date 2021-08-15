import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  public updateUserForm: FormGroup; /* create form group  */
  private codeUser: any = ''
  public message: any = {};
  public errorValid = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UsersService,
    private router: Router) {
    this.updateUserForm = this.formUpdateUser();
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.codeUser = data.code;
      this.findUser(this.codeUser)
    }, error => {
      console.log('error', error)
      let errors: any = error.error;
      this.toastr.error('errors.error', 'Error creating product', {
        timeOut: 10000
      })
    })
  }

  formUpdateUser() {
    return this.formBuilder.group({
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      age: ["", [Validators.required]],
    });
  }

  findUser(code: any) {
    this.userService.findOneUser(code).subscribe(res => {
      let data: any = res;
      this.updateUserForm.patchValue({
        name: data.data.name,
        lastname: data.data.lastname,
        age: data.data.age,
      })

    }, err => {
      console.log('err ', err)
    })
  }

  updateUser(event: Event) {
    event.preventDefault();
    if (this.updateUserForm.valid) {
      this.userService.update(this.updateUserForm.value, this.codeUser).subscribe(res => {
        this.toastr.success('Usuario actualizado correctamente!', 'usuario!', {
          timeOut: 5000
        });
        this.goBack();
      }, err => {
        this.toastr.warning('Error al crear el usuario!', 'Usuario!', {
          timeOut: 5000
        });
        console.log(err)
      })
    } else {
      this.errorValid = true;
      this.message = { error: 'Debe de llenar los campos necesarios para crear un nuevo proveedor...' }
    }
    console.log('here')
  }

  goBack() {
    this.router.navigate(['/users'])
  }
}
