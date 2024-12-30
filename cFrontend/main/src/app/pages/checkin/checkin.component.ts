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
  token: any;
  fileError: string = '';
  selectedFile: File | null = null;

  constructor(public apiService: ApiService, public toastrService: NbToastrService) {
    this.token = localStorage.getItem('key') || '';
  }
  ngOnInit(): void {
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
    // const formData = new FormData();
    // formData.append('file', this.selectedFile);
    // console.log("formData", formData)
    // let checkinForm = {
    //   mood: this.checkinForm.mood,
    //   stress: this.checkinForm.stress,
    //   feelings: this.checkinForm.feelings,
    //   sleepQuality: this.checkinForm.sleepQuality,
    //   energyLevel: this.checkinForm.energyLevel,
    //   physicalActivity: this.checkinForm.physicalActivity,
    //   gratitude: this.checkinForm.gratitude,
    //   copingMechanisms: this.checkinForm.copingMechanisms,
    //   dailyGoal: this.checkinForm.dailyGoal,
    //   token: this.token
    // }
    const formData = new FormData();

    // Append form data fields
    formData.append('mood', this.checkinForm.mood.toString());
    formData.append('stress', this.checkinForm.stress.toString());
    formData.append('feelings', this.checkinForm.feelings);
    formData.append('sleepQuality', this.checkinForm.sleepQuality);
    formData.append('energyLevel', this.checkinForm.energyLevel.toString());
    formData.append('physicalActivity', this.checkinForm.physicalActivity);
    formData.append('gratitude', this.checkinForm.gratitude);
    formData.append('copingMechanisms', this.checkinForm.copingMechanisms);
    formData.append('dailyGoal', this.checkinForm.dailyGoal);
    formData.append('token', this.token);
  
    // Append the file
    formData.append('file', this.selectedFile);
    if (checkinform.valid) {
      this.apiService.postRequest('v1/auth/checkIn', formData).subscribe((chekResponse: any) => {
        if (chekResponse.status == false) {
          this.toastrService.danger(chekResponse.message, 'Error !!');
          checkinform.reset();
        } else {
          this.toastrService.success(chekResponse.message, 'Success');

        }
      })

    }
    else {
      this.toastrService.danger('Please Fill All Fields', 'Error');

      console.log("Required")
    }
  }

  getCheckIn() {
    this.apiService.postRequest('v1/auth/getCheckIn', { token: this.token }).subscribe((getResponse: any) => {
      if (getResponse.status == false) {
        this.toastrService.danger(getResponse.message, 'Error !!');
      } else {
        if (getResponse.data == null) {
          this.checkinForm
        }
        else {

          this.checkinForm = getResponse.data
        }
        // this.toastrService.success(getResponse.message, 'Success');

      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type and size (e.g., max 5 MB)
      const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'Only PNG, JPEG, PDF, and TXT files are allowed.';
        this.selectedFile = null;
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.fileError = 'File size cannot exceed 5 MB.';
        this.selectedFile = null;
        return;
      }

      this.fileError = ''; // Clear error if the file is valid
      this.selectedFile = file;
    }
  }



}
