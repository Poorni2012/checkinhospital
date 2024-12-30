import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';
import { ConfirmationDialogService } from '../../../service/Confirm/confirmation-dialog.service';

@Component({
  selector: 'ngx-edit-kycdetails',
  templateUrl: './edit-kycdetails.component.html',
  styleUrls: ['./edit-kycdetails.component.scss']
})
export class EditKycdetailsComponent implements OnInit {

  currentId: any;
  userObj: any = {};
  modalImg: any = {};
  showColumn: boolean = true;
  Object = Object;

  kyc_front: any = '';
  kyc_back: any = '';
  kyc_selfie: any = '';

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer,
    public confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getUsersDetails(this.currentId);
    }
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()

  }

  getUsersDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('admin/get_one_users', { id: _id }).subscribe((userResponse: any) => {
        if (userResponse.status) {
          this.userObj = userResponse.data;
          if (this.userObj.kyc_front_status == 'Approved' && this.userObj.kyc_back_status == 'Approved' && this.userObj.kyc_selfie_status == 'Approved') {
            this.showColumn = false;
          }
          this.spinnerService.hide()
        }
        else {
          this.userObj = {};
          this.spinnerService.hide()
        }
      })
    }
  }

  public openConfirmationDialog(value: any, type: any, status: any, field: any) {
    this.confirmationDialogService
      .confirm("Please fill the reason for Reject", "Do you really want to delete this record?", true, 'Confirm', 'Cancel', 'lg')
      .then(confirmed => {
        if (confirmed) {
          if (value == 'all') {
            this.updateAllKYCStatus(status, confirmed)
          }
          else {
            this.updateKYCStatus(type, status, field, confirmed)
          }
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to remove this item", 'Error');
      })
  }

  updateKYCStatus(type: any, status: any, field: any, reason: any) {
    let params = {
      user_id: this.userObj._id,
      [type]: status,
      [field]: reason
    };
    this.spinnerService.show();
    this.apiService.postRequest('admin/users_kyc_approve', params).subscribe((updatedResponse: any) => {
      if (updatedResponse.status) {
        this.spinnerService.hide();
        this.toastrService.success(updatedResponse.message, 'Success !!');
        this.getUsersDetails(this.currentId);
      }
      else {
        this.spinnerService.hide();
        this.toastrService.danger(updatedResponse.message, 'Error !!');
      }
    })
  }


  updateAllKYCStatus(status: any, reason: any) {
    let params = {
      user_id: this.userObj._id,
      kyc_front_status: status,
      kyc_back_status: status,
      kyc_front_reason: reason,
      kyc_back_reason: reason
    };
    this.spinnerService.show();
    this.apiService.postRequest('admin/users_kyc_approve', params).subscribe((updatedResponse: any) => {
      if (updatedResponse.status) {
        this.spinnerService.hide();
        this.toastrService.success(updatedResponse.message, 'Success !!');
        this.getUsersDetails(this.currentId);
      }
      else {
        this.spinnerService.hide();
        this.toastrService.danger(updatedResponse.message, 'Error !!');
      }
    })
  }

  showmodalImg(src) {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    this.modalImg = src;
  }

  closemodalImg() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  // KYC Update

  onSelectFile(event: any, type: any) {
    if (event.target.files && event.target.files[0]) {
      var fileType = event.target.files[0].type;
      if (
        fileType != 'image/png' &&
        fileType != 'image/jpg' &&
        fileType != 'image/jpeg'
      ) {
        return this.toastrService.danger("Invalid image format.", 'Error !!');;
      }
      var reader = new FileReader();
      let file = event.target.files[0];
      this[type] = file;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.userObj[type] = event.target.result;
      }
    }
    return event;
  }

  updateUserKYC() {
    this.spinnerService.show()
    let formData = new FormData();
    formData.append('_id', this.userObj._id);
    if (this.kyc_front && this.kyc_front != '') {
      formData.append('kyc_front', this.kyc_front);
    }
    else {
      formData.append('kyc_front', this.userObj.kyc_front);
    }
    if (this.kyc_back && this.kyc_back != '') {
      formData.append('kyc_back', this.kyc_back);
    }
    else {
      formData.append('kyc_back', this.userObj.kyc_back);
    }
    if (this.kyc_selfie && this.kyc_selfie != '') {
      formData.append('kyc_selfie', this.kyc_selfie);
    }
    else {
      formData.append('kyc_selfie', this.userObj.kyc_selfie);
    }
    this.apiService.filePostRequest('admin/admin_update_user_kyc', formData).subscribe((updateResponse: any) => {
      if (updateResponse.status) {
        this.toastrService.success(updateResponse.message, 'Success');
        this.spinnerService.hide();
        this.router.navigate(['/pages/kyc-management']);
      }
      else {
        this.toastrService.danger(updateResponse.message, 'Error');
        this.spinnerService.hide();
      }
    })
  }
}
