import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';
import { SocketService } from '../../../service/socket/socket.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { ConfirmationDialogService } from '../../../service/Confirm/confirmation-dialog.service';
import { Location } from '@angular/common';
import { CommonService } from '../../../service/common/common.service';

@Component({
  selector: 'ngx-view-p2pordermanagement',
  templateUrl: './view-p2pordermanagement.component.html',
  styleUrls: ['./view-p2pordermanagement.component.scss']
})
export class ViewP2pordermanagementComponent implements OnInit {
  addUrl: any;
  onSubmit: boolean
  order_no: any;
  public scrollbarOptions = { axis: 'y', theme: 'dark', position: 'bottom' };
  url: any = {};
  sendOtpCode: any;
  password: any;
  withdrawData: any = {};
  bankDetails: any = {};
  withdrawUserInfo: any = {};
  orderDetails: any = {};
  message_list: any = [];
  message: any;
  user_type: any = 'admin';
  public href: string = "";
  modalImg: any = {};
  imageFile: any = '';
  Number = Number;
  Object = Object;
  writeStatus: any;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer,
    private socketService: SocketService,
    private mScrollbarService: MalihuScrollbarService,
    public confirmationDialogService: ConfirmationDialogService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.order_no = this.activatedRoute.snapshot.paramMap.get('order_no') || '';
    this.addUrl = this.router.url;
    this.socketService.exchange_emit("createP2PRoom", this.order_no);
    this.triggerSocket("msg_list_" + this.order_no).subscribe((res: any) => {
      if (res.status) {
        this.mScrollbarService.update('#chat_msg')
        let self = this;
        setTimeout(function () { self.mScrollbarService.scrollTo('#chat_msg', 'bottom', {}); }, 400);
        this.message_list = res.result;
      }
    });
    if (this.order_no && this.order_no != '') {
      this.getChatMessage(this.order_no)
      this.getOrderOneDetails();
    }

    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()

  }

  goBack() {
    this.location.back();
  }

  triggerSocket(key) {
    return this.socketService.exchange_listen(key);
  }

  // order_no
  getOrderOneDetails() {
    this.spinnerService.show()
    if (this.order_no && this.order_no != '') {
      this.apiService.postRequest('exchange/getSingleOrderDetails', { token: this.order_no }).subscribe((orderOneResponse: any) => {
        if (orderOneResponse.status) {
          this.orderDetails = orderOneResponse.data[0];
          this.spinnerService.hide()
        }
        else {
          this.orderDetails = {};
          this.spinnerService.hide()
        }
      })
    }
  }

  getChatMessage(token: any) {
    let chatParam = {
      orderId: token
    };
    this.apiService.postRequest('exchange/getChatMessage', chatParam).subscribe((chatResponseObj: any) => {
      if (chatResponseObj.status) {
        this.message_list = chatResponseObj.data;
      }
    })
  }

  onFileChange(event) {
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
      this.imageFile = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.orderDetails.proofImage = event.target.result;
        this.uploadAttachment();
      }
    }
  }

  send_message() {
    if (this.message && this.message != '') {
      this.message = this.message.trim();
      let params = {
        'orderId': this.orderDetails.order_no,
        'userId': localStorage.getItem('userID'),
        'typing_user': 'admin',
        'message': this.message,
        'attachment': ''
      }
      this.socketService.exchange_emit('message', params);
      this.message = ''
    }
    else {
      this.toastrService.danger("Enter the message", 'Error !!!');
    }
  }

  uploadAttachment() {
    if (this.imageFile && this.imageFile != '') {
      var formData = new FormData();
      formData.append('attachment', this.imageFile);
      this.apiService.filePostRequest('exchange/uploadAttachment', formData).subscribe((uploadResponseObj: any) => {
        if (uploadResponseObj.status) {
          this.toastrService.success(uploadResponseObj.message, 'Success !!!');
          let params = {
            'orderId': this.orderDetails.order_no,
            'userId': localStorage.getItem('userID'),
            'typing_user': 'admin',
            'message': '',
            'attachment': uploadResponseObj.data.Location
          }
          this.socketService.exchange_emit('message', params);
          this.imageFile = '';
        }
        else {
          this.toastrService.danger(uploadResponseObj.message, 'Error !!!');
        }
      })
    }
  }

  public openConfirmationDialog(type: any) {
    this.confirmationDialogService
      .confirm("Please confirm..", "Are you really want to do this action ?")
      .then(confirmed => {
        if (confirmed) {
          this.updateFavourite(type);
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to confirm this order", 'Error !!');
      })
  }


  updateFavourite(type: any) {
    console.log("🚀 ~ ViewP2pordermanagementComponent ~ updateFavourite ~ type:", type)
    let favourParams = {
      user_type: type,
      order_no: this.orderDetails.order_no
    };
    this.apiService.postRequest('exchange/updateOrderAction', favourParams).subscribe((updateResponse: any) => {
      if (updateResponse.status) {
        this.toastrService.success(updateResponse.message, 'Success !!');
        this.getOrderOneDetails();
      }
      else {
        this.toastrService.danger(updateResponse.message, 'Error !!');
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

  cancel_order() {
    var params
    if (this.orderDetails.posttype == 'sell') {
      params = {
        userId: this.commonService.dataEncryption(this.orderDetails.buy_user_id),
        id: this.orderDetails._id,
        type: this.orderDetails.user_type,
        status: 'cancelled'
      };
    } else {
      params = {
        userId: this.commonService.dataEncryption(this.orderDetails.sell_user_id),
        id: this.orderDetails._id,
        type: this.orderDetails.user_type,
        status: 'cancelled'
      };
    }
    this.apiService.postRequest('exchange/updateP2PRequest', params).subscribe((paymentResponseObj: any) => {
      if(paymentResponseObj.status == true){
        this.toastrService.success(paymentResponseObj.message, 'Success !!');
        this.router.navigate([`/pages/p2p-order-management/p2p-list-all-order`]);
      }else{
        this.toastrService.danger(paymentResponseObj.message, 'Error !!');
      }

    })
  }
}
