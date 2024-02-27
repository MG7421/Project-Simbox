import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-steptwoverification',
  templateUrl: './steptwoverification.component.html',
  styleUrls: ['./steptwoverification.component.scss']
})
export class SteptwoverificationComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  user : any = {};
  config = { length: 4, allowNumbersOnly: true,
    inputStyles: { 'width': '50px', 'height': '50px'}
  };

  constructor( private formBuilder: FormBuilder, private authService: AuthfakeauthenticationService,   private toastr: ToastrService,

     public activeModal: NgbActiveModal,  private router: Router,
  ) {     this.user = this.authService.currentUserValue;}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  get otpControlInvalid() {const control = this.loginForm.get('otp');
    return control.touched && control.invalid;
  }

  get isSubmitDisabled(): boolean {
    return this.loginForm.invalid || this.loading;
  }

  onOtpChange(otp: string) { const otpControl = this.loginForm.get('otp');
     otpControl.setValue(otp); if (otp.length === this.config.length) {
      otpControl.markAsTouched();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const otpValue = this.loginForm.value.otp;

      this.authService.confirmLogin(otpValue).subscribe(
        (response) => {
          if (response && response.items && response.items.length) {
            console.log('OTP verification successful:', response);
            setTimeout(() => {
              this.loading = false;
              this.activeModal.close();
              this.router.navigate(['/dashboard']);
              this.toastr.success('OTP vérifié avec succès.');
            }, 1000);
          } else {
            this.loading = false;
            this.activeModal.close();
            this.toastr.error('Échec de la vérification de l\'OTP.');
          }
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Erreur lors de la vérification de l\'OTP.');
          console.error('OTP verification failed:', error);
        }
      );
    }
  }
}


