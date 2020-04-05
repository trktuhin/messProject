import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType, CameraPhoto } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  selectedImageUrl = 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
  imgFile: Blob;
  usePicker = false;
  profileForm: FormGroup;
  constructor(private platform: Platform, private fb: FormBuilder) { }
  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }
    this.createProfileForm();
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
          this.profileForm.patchValue({image: this.imgFile});
        } catch (error) {
          console.log('COULD NOT CONVERT YOUR FILE');
        }
      });
    }).catch(err => {
      if(this.usePicker) {
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
      this.profileForm.patchValue({image: this.imgFile});
    };
    fr.readAsDataURL(pickedFile);
  }

  onSubmitForm() {
    console.log(this.profileForm);
  }
}
