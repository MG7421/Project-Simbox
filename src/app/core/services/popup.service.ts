import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private modalService: NgbModal) {}

  openComponentDialog(component: any, size: 'sm' | 'lg' | 'xl' = 'lg'): NgbModalRef {
    const modalRef: NgbModalRef = this.modalService.open(component, { size });
    return modalRef;
  }

  openTemplateDialog(templateRef: any, size: 'sm' | 'lg' | 'xl' = 'lg'): NgbModalRef {
    const modalRef: NgbModalRef = this.modalService.open(templateRef, { size });
    return modalRef;
  }

  openComponentDialogExtraLarge(component: any): NgbModalRef {
    const modalRef: NgbModalRef = this.modalService.open(component, { size: 'xl' });
    return modalRef;
  }

  openTemplateDialogExtraLarge(templateRef: any): NgbModalRef {
    const modalRef: NgbModalRef = this.modalService.open(templateRef, { size: 'xl' });
    return modalRef;
  }
}
