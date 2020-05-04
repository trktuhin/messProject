import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType, CameraPhoto } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../_services/profile.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('filePicker', null) filePickerRef: ElementRef<HTMLInputElement>;
  selectedImageUrl = '';
  imgFile: Blob;
  usePicker = false;
  profileForm: FormGroup;
  constructor(private platform: Platform, private fb: FormBuilder,
              private profleService: ProfileService, private authService: AuthService,
              private toastCntrl: ToastController) { }
  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }
    this.createProfileForm();
  }

  ionViewWillEnter() {
    this.profleService.getProfileInfo().subscribe(res => {
      // console.log(res);
      this.profileForm.patchValue({
        firstName: res.firstName,
        lastName: res.lastName,
        emailAddress: res.email
      });
      if (res.photoUrl) {
        this.selectedImageUrl = environment.baseImageUrl + res.photoUrl;
      } else {
        this.selectedImageUrl = environment.baseImageUrl + '/user.jpg';
      }
    });
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      firstName: ['Robin', [Validators.required]],
      lastName: ['Khan', [Validators.required]],
      emailAddress: ['robinkhantuhin404@gmail.com', [Validators.required, Validators.email]],
      image: [null]
    });
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 320,
      resultType: CameraResultType.Uri
    }).then(image => {
      this.selectedImageUrl = image.webPath;
      Plugins.Filesystem.readFile({
        path: image.path
      }).then(result => {
        const imgData = result.data;
        try {
          this.imgFile = base64toBlob(imgData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
          // console.log('YOUR FILE', this.imgFile);
          this.profileForm.patchValue({ image: this.imgFile });
        } catch (error) {
          console.log('COULD NOT CONVERT YOUR FILE');
        }
      });
    }).catch(err => {
      if (this.usePicker) {
        this.filePickerRef.nativeElement.click();
      }
      console.log(err);
    });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      this.selectedImageUrl = fr.result.toString();
      this.imgFile = pickedFile;
      // console.log(this.imgFile);
      this.profileForm.patchValue({ image: this.imgFile });
    };
    fr.readAsDataURL(pickedFile);
  }

  onSubmitForm() {
    const model = new FormData();
    model.append('firstName', this.profileForm.get('firstName').value);
    model.append('lastName', this.profileForm.get('lastName').value);
    model.append('email', this.profileForm.get('emailAddress').value);
    model.append('image', this.profileForm.get('image').value);

    this.profleService.editProfileInfo(model).subscribe(res => {
      const user: any = res;
      localStorage.setItem('user', JSON.stringify(user));
      this.authService.currentUser = user;
      this.authService.changeProfilePhoto(user.photoUrl);
      this.toastCntrl.create({
        message: 'Profile updated successfully',
        duration: 2000,
        color: 'success'
      }).then(el => el.present());
    }, err => console.log(err));
  }
}
