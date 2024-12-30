import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-edit-supportticket',
  templateUrl: './edit-supportticket.component.html',
  styleUrls: ['./edit-supportticket.component.scss']
})
export class EditSupportticketComponent implements OnInit {

  ticketOneObj: any = {};
  currentId: any;
  onSubmit: boolean = false;
  onDisabled: boolean;
  ticket_image: any = ''
  logoImage: any = ''

  message: any = '';
  public scrollbarOptions = { axis: 'y', theme: 'dark', position: 'bottom' };

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getOneSupportTicketDetails(this.currentId);
    }
    this.apiService.ipCheck()
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var fileType = event.target.files[0].type;
      if (
        fileType != 'image/png' &&
        fileType != 'image/jpg' &&
        fileType != 'image/jpeg' &&
        fileType != 'image/svg+xml'
      ) {
        return this.toastrService.danger("Invalid image format.", 'Error !!');;
      }
      var reader = new FileReader();
      let file = event.target.files[0];
      this.ticket_image = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.ticketOneObj.ticket_image = event.target.result;
      }
    }
  }

  getOneSupportTicketDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('admin/get_oneTicket', { _id: _id }).subscribe((supportTicketResponse: any) => {
        if (supportTicketResponse.status) {
          this.ticketOneObj = supportTicketResponse.data;
          this.spinnerService.hide();
        }
        else {
          this.ticketOneObj = {};
          this.spinnerService.hide();
        }
      })
    }
  }

  supportTicketDetails(SupportTicketEditForm: NgForm) {
    this.onSubmit = true
    if (SupportTicketEditForm.valid) {
      this.spinnerService.show()
      let params = {
        id: this.ticketOneObj._id,
        status: this.ticketOneObj.status,
      };
      this.apiService.postRequest('admin/update_supportTicket', params).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.router.navigate([`/pages/p2p-suppportTicket`]);
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

  send_message() {
    if (this.message && this.message != '') {
      let params = {
        _id: this.ticketOneObj._id,
        message: this.message.trim(),
        user_type: 'Admin'
      };
      this.apiService.postRequest('admin/chatWithUserTicket', params).subscribe((chatResponse: any) => {
        if (chatResponse.status) {
          this.toastrService.success(chatResponse.message, 'Success');
          this.ticketOneObj = chatResponse.data;
          this.message = '';
        }
        else {
          this.toastrService.danger(chatResponse.message, 'Error')
        }
      })
    }
    else {
      this.toastrService.danger('Please enter the message', 'Error')
    }
  }

}
