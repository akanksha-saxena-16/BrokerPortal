import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserVM, UserRoleVM } from 'src/app/BP.Models';
import { UserService, UserRoleService } from 'src/app/BP.Services';
import { ConfirmationComponent } from 'src/app/BP.Shared';
import { UtilsService } from 'src/app/BP.Shared';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html'
})
export class UserCreateComponent implements OnInit {
  isSubmitting: boolean = false;
  formSubmitted: boolean = false;
  userCreateForm: FormGroup;
  roles: UserRoleVM[];
  rolesLoaded = false;
  @ViewChild(ConfirmationComponent) confirmComponent: ConfirmationComponent;

  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    private utils: UtilsService,
    private userService: UserService,
    private userRoleService: UserRoleService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  public validationMessages = {
    'FirstName': {
      'required': 'First name is Required.',
      'maxlength': 'First name length should not be greater than 50 characters.'
    },
    'LastName': {
      'required': 'Last name is Required.',
      'maxlength': 'Last name length should not be greater than 50 characters.'
    },
    'Email': {
      'required': 'Email is Required.',
      'maxlength': 'Email length should not be greater than 255 characters.',
      'email': 'Invalid email format provided.'
    },
    'PhoneNo': {
      'required': 'Phone number is Required.',
      'maxlength': 'Phone number entered is invalid.',
      'minlength': 'Phone number entered is invalid.'
    },
    'AddressLine1': {
      'required': 'Address line1 is Required.',
      'maxlength': 'Address line1 length should not be greater than 255 characters.'
    },
    'AddressLine2': {
      'required': 'Address line2 is Required.',
      'maxlength': 'Address line2 length should not be greater than 255 characters.'
    },
    'Postcode': {
      'required': 'Postcode is Required.',
      'maxlength': 'Postcode length should not be greater than 4 characters.'
    },
    'Suburb': {
      'required': 'Suburb is Required.',
      'maxlength': 'Suburb length should not be greater than 255 characters.'
    },
    'State': {
      'required': 'State is Required.',
      'maxlength': 'State length should not be greater than 255 characters.'
    },
    'City': {
      'required': 'City is Required.',
      'maxlength': 'City length should not be greater than 255 characters.'
    },
    'Password': {
      'required': 'Password is Required.',
      'pattern': 'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
    },
    'ConfirmPassword': {
      'required': 'Confirm password is Required.',
      'mustMatch': 'Confirm password must match with password.'
    },
    'RoleID': {
      'required': 'Role is Required.'
    }
  };
  formErrors = {
    'FirstName': '',
    'LastName': '',
    'Email': '',
    'PhoneNo': '',
    'AddressLine1': '',
    'AddressLine2': '',
    'Postcode': '',
    'Suburb': '',
    'State': '',
    'City': '',
    'Password': '',
    'ConfirmPassword': '',
    'RoleID': '',
  };

  public onValueChanged(data?: any) {
    if (!this.userCreateForm) { return; }
    const form = this.userCreateForm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid && this.userCreateForm) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  buildForm() {
    // use FormBuilder to create a form group
    this.userCreateForm = this.fb.group({
      'FirstName': ['', [Validators.required, Validators.maxLength(50)]],
      'LastName': ['', [Validators.required, Validators.maxLength(50)]],
      'Email': ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      'PhoneNo': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      'AddressLine1': ['', [Validators.required, Validators.maxLength(255)]],
      'AddressLine2': ['', [Validators.required, Validators.maxLength(255)]],
      'Postcode': ['', [Validators.required, Validators.maxLength(4)]],
      'Suburb': ['', [Validators.required, Validators.maxLength(255)]],
      'State': ['', [Validators.required, Validators.maxLength(255)]],
      'City': ['', [Validators.required, Validators.maxLength(255)]],
      'Password': ['', [Validators.required, Validators.pattern(this.utils.passwordRegex)]],
      'ConfirmPassword': ['', [Validators.required]],
      'RoleID': ['', [Validators.required]],
      // 'UserTypeId': [''],
      // 'BrokerCode': [''],
      // 'BrokerUAG': [''],
    }, {
        validator: this.utils.MustMatch('Password', 'ConfirmPassword')
      });

    this.userCreateForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  resetForm() {
    //console.log('Reset Form');
    this.userCreateForm.reset();
    this.formSubmitted = false;
    this.isSubmitting = false;
    for (let name in this.userCreateForm.controls) {
      this.userCreateForm.controls[name].setErrors(null);
    }
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roles = [];
    this.userRoleService.getActiveRoleList()
      .subscribe(data => {
        console.log(data)
        this.roles = data;
        this.rolesLoaded = true;
      });
  }

  submitForm() {
    //this.errors = { errors: {} };
    this.formSubmitted = true;
    this.onValueChanged(this.userCreateForm);
    if (this.userCreateForm.valid) {
      this.confirmComponent.showAlertModal('Are you sure you want to add this broker?', x => this.createUser());
    }
  }

  createUser() {
    this.isSubmitting = true;
    const user: UserVM = this.userCreateForm.value;
    //user.RoleID = 1;
    user.UserTypeId = 1;
    console.log(user)
    this.userService
      .createUser(user)
      .subscribe(
        res => {
          if (res == true) {
            alert('Broker successfully added.');
            this.resetForm();
          }
        },
        err => {
          //this.errors = { errors: { '': err.message } };
          this.isSubmitting = false;
        }
      );
  }


}
