import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})
export class EditPaymentComponent implements OnInit {

  onSubmit: boolean = false;

  constructor(public apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService
  ) { }

  editPaymentObj: any = {};
  currentId: any;

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getCurrentPaymentDetails(this.currentId);
    }
    this.apiService.ipCheck()
  }

  getCurrentPaymentDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('exchange/singlePaymentType', { _id: _id }).subscribe((paymentCurrentResponse: any) => {
        if (paymentCurrentResponse.status) {
          this.editPaymentObj = paymentCurrentResponse.data;
          this.spinnerService.hide()
        }
        else {
          this.editPaymentObj = {};
          this.spinnerService.hide()
        }
        
      })
    }
  }



  editPaymentDetails(editPaymentForm: NgForm) {
    this.onSubmit = true

    if (editPaymentForm.valid) {
      this.spinnerService.show()
      this.apiService.postRequest('exchange/editPaymentType', this.editPaymentObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.router.navigate([`/pages/payment-management`]);
          this.onSubmit = false
        }
        else {
          this.toastrService.danger(updateResponse.message, 'Error !!');
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
    }
  }



}
