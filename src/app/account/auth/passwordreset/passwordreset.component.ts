// passwordreset.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Importez le service ToastrService
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  success: any = '';
  loading = false;
  year: number = new Date().getFullYear();

 // passwordreset.component.ts
constructor(
  private formBuilder: UntypedFormBuilder,
  private router: Router,
  private authService: AuthfakeauthenticationService,
  private toastr: ToastrService,
) {}


  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit() {
  }

  get f() { return this.resetForm.controls; }

// passwordreset.component.ts
onSubmit() {
  this.success = '';
  this.submitted = true;
  if (this.resetForm.invalid || this.loading) {
    console.log('invalid form');
    return;
  }

  this.loading = true; // Activez le chargement
  this.authService.Réinitialisation().subscribe(
    (response) => {
      this.success = 'Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.';
      this.toastr.success('Mot de passe réinitialisé avec succès', 'Succès');
      this.loading = false; // Désactivez le chargement après une réponse réussie
    },
    (error) => {
      this.error = 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.';
      this.toastr.error('Erreur lors de la réinitialisation du mot de passe', "Erreur");
      this.loading = false; // Désactivez le chargement en cas d'erreur
    }
  );
}


}
