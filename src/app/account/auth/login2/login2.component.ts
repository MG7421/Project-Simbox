import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PopupService } from 'src/app/core/services/popup.service';
import { SteptwoverificationComponent } from 'src/app/extrapages/steptwoverification/steptwoverification.component';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
/**
 * Login-2 component
 */


export class Login2Component implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  hidePassword = true;
  error = '';
  private unsubscribe$: Subject<void> = new Subject<void>();
year: any;
carouselOption: any;

  // tslint:disable-next-line: max-line-length
  constructor(   private formBuilder: FormBuilder,
    private authService: AuthfakeauthenticationService,
    private toastr: ToastrService,
    private popupService: PopupService) { }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required],
        isLdap: [false, Validators.required]
      });
    }


    get f() {
      return this.loginForm.controls;
    }

    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid || this.loading) {
        return;
      }

      const userLogin = this.f['login'].value; // Utilisation de 'login' au lieu de 'email'
      const userPassword = this.f['password'].value;
      const isLdap = this.f['isLdap'].value;

      this.loading = true;

      this.authService.login(userLogin, userPassword, isLdap)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (res: any) => {
            const modalRef = this.popupService.openComponentDialog(SteptwoverificationComponent);
            modalRef.result.then( (result) => { if (result === 'verified') { this.handleSuccessfulLogin(res);} },
            (reason) => { this.showErrorNotification('La vérification à deux étapes a échoué', 'Erreur'); } );
            this.loading = false; }, (error) => {
            console.log('error', error);
            this.submitted = false;
            this.loading = false;
            this.handleError(error);
          }
        );
    }

    private handleSuccessfulLogin(res: any) {
      this.showSuccessNotification(res['status']['message'], 'Succès');
      // Autres logiques si nécessaire
      this.loading = false;
    }

    private showSuccessNotification(message: string, title: string): void {
      this.toastr.success(message, title);
    }

    private showErrorNotification(message: string, title: string): void {
      this.toastr.error(message, title);
    }

    private handleError(error: any): void {
      console.error("Une erreur s'est produite", error);
      let errorMessage = "Une erreur s'est produite. Veuillez réessayer plus tard.";
      if (error.error && error.error.status && error.error.status.message) {
        errorMessage = error.error.status.message;
      }
      this.showErrorNotification(errorMessage, 'Erreur');
      this.loading = false;
    }

    ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
}
