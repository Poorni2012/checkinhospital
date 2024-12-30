import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  paymentObj: any = {};
  onSubmit: boolean = false;
  onDisabled: boolean=false;


  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.apiService.ipCheck()
  }

  addpaymentDetails(paymentAddForm: NgForm) {
    this.onSubmit = true

    if (paymentAddForm.valid) {
      this.spinnerService.show()
      this.onDisabled=true
      this.apiService.postRequest('exchange/addPaymentType', this.paymentObj).subscribe((paymentResponse: any) => {
        if (paymentResponse.status) {
          this.toastrService.success(paymentResponse.message, 'Success');
          this.router.navigate([`/pages/payment-management`]);
          this.onSubmit = false
          this.onDisabled=false

        }
        else {
          this.toastrService.danger(paymentResponse.message, 'Error !!');
          this.onDisabled=false
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
      this.onDisabled=false
    }
  }


}
