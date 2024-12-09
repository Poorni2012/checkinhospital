import { Component } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { NgForm } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent {
  token:any;
  constructor(public apiService: ApiService, public toastrService: NbToastrService) { 
    this.token = localStorage.getItem('key') || '';
  }
  ngOnInit():void{
    this.getCheckIn()
  }
  checkinForm = {
    mood: 0,
    stress: 0,
    feelings: '',
    sleepQuality: '',
    energyLevel: 0,
    physicalActivity: '',
    gratitude: '',
    copingMechanisms: '',
    dailyGoal: '',
  };
  
  submitForm(checkinform: NgForm) {
    console.log('Check-in data submitted:', this.checkinForm);

    let checkinForm={
      mood: this.checkinForm.mood,
      stress: this.checkinForm.stress,
      feelings: this.checkinForm.feelings,
      sleepQuality: this.checkinForm.sleepQuality,
      energyLevel: this.checkinForm.energyLevel,
      physicalActivity: this.checkinForm.physicalActivity,
      gratitude: this.checkinForm.gratitude,
      copingMechanisms: this.checkinForm.copingMechanisms,
      dailyGoal: this.checkinForm.dailyGoal,
      token:this.token
    }
    if (checkinform.valid) {
      this.apiService.postRequest('v1/auth/checkIn', checkinForm).subscribe((chekResponse: any) => {
        if(chekResponse.status == false){
          this.toastrService.danger(chekResponse.message, 'Error !!');
          checkinform.reset();
        }else{
          this.toastrService.success(chekResponse.message, 'Success');

        }
      })

    }
    else {
      this.toastrService.danger('Please Fill All Fields', 'Error');

      console.log("Required")
    }
  }

  getCheckIn(){
    this.apiService.postRequest('v1/auth/getCheckIn', {token:this.token}).subscribe((getResponse: any) => {
      if(getResponse.status == false){
        this.toastrService.danger(getResponse.message, 'Error !!');
      }else{
        if(getResponse.data == null){
          this.checkinForm
        }
        else{

          this.checkinForm = getResponse.data
        }
        // this.toastrService.success(getResponse.message, 'Success');

      }
    })
  }
}
