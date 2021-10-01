import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { CommonService } from '../../common.function';
// import { ReportSelectionPage } from '../../../app/modal/report-selection/report-selection.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonSelectionPage } from '../../../app/modal/common-selection/common-selection.page';
import { ActionSheetController } from '@ionic/angular';

import { WebView } from '@ionic-native/ionic-webview/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-report-selection',
  templateUrl: './report-selection.page.html',
  styleUrls: ['./report-selection.page.scss'],
  providers: [FormBuilder, Camera, File, WebView],
})
export class ReportSelectionPage implements OnInit {
  PreviewPDF = false;
  show: boolean = false;
  inspectionTypes: any = [];
  public createInpForm: FormGroup;
  HouseInModes_: any;
  RecentWeatherConditions: any = [];
  WeatherConditions: any = [];
  MainEnteranceConsidered: any = [];
  selectedCodeValue: any;
  added_items: any;
  StoredData: any;
  displayImage: any;
  textEnter: any;
  storedReportOverviewImage: any;
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private plt: Platform,
    public config: CommonService,
    private alertController: AlertController,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private sctionS: ActionSheetController,
    private filePath: FilePath
  ) {
    this.inspectionTypes = [{ name: 'Structure' }];

    this.HouseInModes_ = [
      {
        name: 'No Comment',

        formValue: '1',
      },
      {
        name: 'Well Built/Maintained',

        formValue: '2',
      },
      {
        name: 'Average Qual./Lacking Maint.',

        formValue: '3',
      },
      {
        name: 'Well built/ Lacking Maint.',
        formValue: '3',
      },
      {
        name: 'Average Qual./ Lacking Maint.',
        formValue: '3',
      },
      {
        name: 'Well built/ Agile Systems',
        formValue: '3',
      },
      {
        name: 'Average Quality/ Agile Systems',
        formValue: '3',
      },
      {
        name: 'Well built/ Numerous Repairs',
        formValue: '3',
      },
      {
        name: 'Average Qual./ Numerous Rep',
        formValue: '3',
      },
      {
        name: 'Low Quality/ Numerous Repairs',
        formValue: '3',
      },
    ];
    this.WeatherConditions = [
      {
        name: 'Dry',

        formValue: '1',
      },
      {
        name: 'Wet',

        formValue: '2',
      },
      {
        name: 'Snow On Ground',

        formValue: '3',
      },
      {
        name: 'Adverse Weather',

        formValue: '4',
      },
      {
        name: 'Temperature',

        formValue: '4',
      },
    ];

    this.RecentWeatherConditions = [
      {
        name: 'Dry',

        formValue: '1',
      },
      {
        name: 'Occasional Rain',

        formValue: '2',
      },
      {
        name: 'Very Wet',

        formValue: '3',
      },
      {
        name: 'Winter Weather',

        formValue: '4',
      },
    ];

    this.MainEnteranceConsidered = [
      {
        name: 'North',

        formValue: '1',
      },
      {
        name: 'South',

        formValue: '2',
      },
      {
        name: 'East',

        formValue: '3',
      },
      {
        name: 'West',

        formValue: '4',
      },
    ];

    this.createInpForm = this.formBuilder.group({
      houseInModes: ['', [Validators.required]],
      ApproximateAgeofHouse: ['', [Validators.required]],
      MainEnteranceConsidered: [''],
      AdditionalComment: [''],
      WeatherConditions: [''],
      RecentWeatherConditions: ['', [Validators.required]],
      textEnter: [''],
      tempSet: [''],
    });
  }

  ionViewDidEnter() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];

    if (StorageDate != undefined) {
      // var uniqueCount = arr1["0"].Unique;

      this.StoredData = JSON.parse(StorageDate);
      console.log(this.StoredData);

      this.createInpForm = this.formBuilder.group({
        houseInModes: [
          this.StoredData.report_section[0].houseInModes,
          [Validators.required],
        ],
        ApproximateAgeofHouse: [
          this.StoredData.report_section[0].ApproximateAgeofHouse,
          [Validators.required],
        ],
        MainEnteranceConsidered: [
          this.StoredData.report_section[0].MainEnteranceConsidered,
        ],
        AdditionalComment: [
          this.StoredData.report_section[0].AdditionalComment,
        ],
        WeatherConditions: [
          this.StoredData.report_section[0].WeatherConditions,
        ],
        RecentWeatherConditions: [
          this.StoredData.report_section[0].RecentWeatherConditions,
        ],

        textEnter: [''],

        tempSet: [this.StoredData.report_section[0].tempSet],
      });

      let storedReportOverviewImage = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.storedReportOverviewImage =
        storedReportOverviewImage.storedReportOverviewImage;

      console.log(this.storedReportOverviewImage);
      console.log(storedReportOverviewImage.storedReportOverviewImage);
    }
  }

  ngOnInit() {}

  async closeM() {
    let dataSent = {
      empty: 0,
    };

    await this.modalController.dismiss(dataSent);
  }

  async goToSelection(n) {
    if (n == 'Structure') {
      console.log(n);
    }

    const modal = await this.modalController.create({
      cssClass: 'update-popup-modal',
      component: ReportSelectionPage,
      componentProps: {},
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        let d = dataReturned.data;

        if (d.empty == 0) {
          return;
        }
        if (d.empty == 1) {
          let inps = JSON.parse(
            this.config.storageGet('CreateInspection')['__zone_symbol__value']
          );
          console.log(inps);

          return;
        }
        if (d.location) {
        }
      }
    });

    return await modal.present();
  }

  saveReport() {
    // console.log(this.createInpForm.value);
    this.getData_toInsert();
  }

  getData_toInsert() {
    let InspectionsCreated2 = JSON.parse(
      this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
    );

    console.log(InspectionsCreated2);
    console.log(InspectionsCreated2);

    if (InspectionsCreated2 != undefined) {
      console.log('NOT . NEW INSPECTION UNDEFINED------------>>>>>');
    }

    console.log(this.StoredData);

    this.StoredData.report_section = [
      {
        houseInModes: this.createInpForm.value.houseInModes,
        ApproximateAgeofHouse: this.createInpForm.value.ApproximateAgeofHouse,
        MainEnteranceConsidered: this.createInpForm.value
          .MainEnteranceConsidered,
        AdditionalComment: this.createInpForm.value.AdditionalComment,
        WeatherConditions: this.createInpForm.value.WeatherConditions,
        RecentWeatherConditions: this.createInpForm.value
          .RecentWeatherConditions,
        tempSet: this.createInpForm.value.tempSet,
      },
    ];

    console.log('???' + this.StoredData);

    this.config.storageRemoveItem('InspectionToEdit');
    this.config.storageSave('InspectionToEdit', this.StoredData);

    this.updatePhoto();
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    this.config.presentToast('Selection have been saved.');
  }

  async openCommonModal() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];

    // var uniqueCount = arr1["0"].Unique;

    this.StoredData = JSON.parse(StorageDate);

    console.log(this.StoredData);

    let commArr = {
      client_Info: [
        {
          clientName: this.StoredData.client_Info.clientName,
          inspectionAddress: this.StoredData.client_Info.inspectionAddress,
          inspector: this.StoredData.client_Info.inspector,
          reportNumber: this.StoredData.client_Info.reportNumber,
          inspectionDate: this.StoredData.client_Info.inspectionDate,
        },
      ],

      report_Selection_Info: [
        {
          houseInModes: this.createInpForm.value.houseInModes,
          ApproximateAgeofHouse: this.createInpForm.value.ApproximateAgeofHouse,
          MainEnteranceConsidered: this.createInpForm.value
            .MainEnteranceConsidered,
          AdditionalComment: this.createInpForm.value.AdditionalComment,
          WeatherConditions: this.createInpForm.value.WeatherConditions,
          RecentWeatherConditions: this.createInpForm.value
            .RecentWeatherConditions,
          tempSet: this.createInpForm.value.tempSet,
        },
      ],
    };

    console.log(this.StoredData);

    let arr2 = {
      clientName: this.StoredData.client_Info.clientName,
    };

    const modal = await this.modalController.create({
      cssClass: 'update-popup-modal',
      component: CommonSelectionPage,
      componentProps: {
        clientDetails: commArr,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        let d = dataReturned.data;

        if (d.empty == 0) {
          return;
        }
        if (d.empty == 1) {
          let inps = JSON.parse(
            this.config.storageGet('CreateInspection')['__zone_symbol__value']
          );
          console.log(inps);

          return;
        }
        if (d.location) {
        }
      }
    });

    return await modal.present();
  }

  codeSelected() {
    console.log('It');
  }

  async selectImage() {
    const actionSheet = await this.sctionS.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takeAPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takeAPicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async takeAPicture(sourceType) {
    console.log(sourceType);

    // this.camera.getPicture(options).then(
    //   (imageData) => {
    //     // imageData is either a base64 encoded string or a file URI
    //     this.displayImage = displayImage;
    //     // console.log();

    //     this.displayImage = 'data:image/jpeg;base64,' + imageData;
    //   },
    //   (err) => {
    //     // Handle error
    //   }
    // );

    // console.log(tempImage);

    if (sourceType === 0) {
      const options2: CameraOptions = {
        sourceType: sourceType,
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
      };

      const tempImage2 = await this.camera.getPicture(options2);

      console.log('image data =>  ', tempImage2);
      let base64Img = 'data:image/jpeg;base64,' + tempImage2;
      // this.userImg = this.base64Img;
      console.log('displayImage' + base64Img);
      this.displayImage = base64Img;

      return;
      this.filePath
        .resolveNativePath(tempImage2)
        .then((filePath) => {
          console.log(filePath);
          const tempFilename2 = filePath.substr(
            tempImage2.lastIndexOf('/') + 1
          );
          console.log('Only File Name -1- GALLERY' + tempFilename2);

          // return;
          // const tempBaseFilesystemPath = filePath.substr(
          //   0,
          //   filePath.lastIndexOf('/') + 1
          // );

          let correctPath: string = filePath.substr(
            0,
            filePath.lastIndexOf('/') + 1
          );
          let currentName: string = filePath.substr(
            filePath.lastIndexOf('/') + 1
          );
          console.log('currentName', currentName);
          console.log('correctPath', correctPath);

          console.log('Whats This 2nd?' + correctPath);

          // Get the Data directory on the device.
          // Result example: file:///var/mobile/Containers/Data/Application
          // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/Library/NoCloud/
          const newBaseFilesystemPath = this.file.dataDirectory;

          this.file.copyFile(
            correctPath,
            tempFilename2,
            newBaseFilesystemPath,
            tempFilename2
          );

          // Result example: file:///var/mobile/Containers/Data/Application
          // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/Library/NoCloud/cdv_photo_003.jpg
          const storedPhoto = newBaseFilesystemPath + tempFilename2;

          // window.Ionic.WebView.convertFileSrc()

          // const displayImage = this.webview.convertFileSrc(storedPhoto);
          const displayImage = this.webview.convertFileSrc(storedPhoto);
          // this.displayImage = filePath;
          console.log('displayImage' + displayImage);
          this.displayImage = displayImage;
        })
        .catch((err) => console.log(err));
    }
    if (sourceType === 1) {
      const options: CameraOptions = {
        sourceType: sourceType,
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
      };

      const tempImage = await this.camera.getPicture(options);

      // Extract just the filename. Result example: cdv_photo_003.jpg
      const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);

      console.log('Only File Name -0-' + tempFilename);

      // Now, the opposite. Extract the full path, minus filename.
      // Result example: file:///var/mobile/Containers/Data/Application
      // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/tmp/
      const tempBaseFilesystemPath = tempImage.substr(
        0,
        tempImage.lastIndexOf('/') + 1
      );

      // Get the Data directory on the device.
      // Result example: file:///var/mobile/Containers/Data/Application
      // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/Library/NoCloud/
      const newBaseFilesystemPath = this.file.dataDirectory;

      await this.file.copyFile(
        tempBaseFilesystemPath,
        tempFilename,
        newBaseFilesystemPath,
        tempFilename
      );

      // Result example: file:///var/mobile/Containers/Data/Application
      // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/Library/NoCloud/cdv_photo_003.jpg
      const storedPhoto = newBaseFilesystemPath + tempFilename;

      // window.Ionic.WebView.convertFileSrc()

      // const displayImage = this.webview.convertFileSrc(storedPhoto);
      const displayImage = this.webview.convertFileSrc(storedPhoto);

      console.log('displayImage' + displayImage);
      this.displayImage = displayImage;
    }
    // this.updatePhoto(this.displayImage, this.createInpForm.value.textEnter);
  }

  updatePhoto() {
    let displayImage = this.displayImage;
    let txt = this.createInpForm.value.textEnter;

    console.log(displayImage);

    if (displayImage == null || displayImage == undefined) {
      return;
    }

    // let storedReportOverviewImage = this.config.storageGet('InspectionToEdit')[
    //   '__zone_symbol__value'
    // ]['storedReportOverviewImage'];

    let storedReportOverviewImage = this.StoredData[
      'storedReportOverviewImage'
    ];

    let test = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['client_Info'];
    console.log('GET test=====' + JSON.stringify(test));

    console.log(
      'GET storedReportOverviewImage=====' +
        JSON.stringify(storedReportOverviewImage)
    );

    // return;

    let newArray = [
      {
        img: displayImage,
        text: txt,
      },
    ];

    console.log(storedReportOverviewImage);

    console.log(newArray);

    if (storedReportOverviewImage != undefined) {
      let arr3 = [...storedReportOverviewImage, ...newArray];

      console.log('Array To Add++++++++' + JSON.stringify(arr3));

      // this.StoredData = JSON.parse(
      //   this.config.storageGet('storedReportOverviewImage')[
      //     '__zone_symbol__value'
      //   ]
      // );

      this.StoredData.storedReportOverviewImage = arr3;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      let StorageDate = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ];

      this.StoredData = [];
      this.StoredData = JSON.parse(StorageDate);

      this.storedReportOverviewImage = arr3;

      // console.log(this.StoredData);
      return;
    } else {
      console.log('2nd-----------------');

      console.log(this.StoredData);

      this.StoredData.storedReportOverviewImage = [
        {
          img: displayImage,
          text: txt,
        },
      ];

      console.log(this.StoredData);

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      let StorageDate = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ];

      this.StoredData = [];
      this.StoredData = JSON.parse(StorageDate);
      this.storedReportOverviewImage = this.StoredData.storedReportOverviewImage;
      // console.log(this.StoredData);

      // this.config.storageRemoveItem('InspectionToEdit');
      // this.config.storageSave('InspectionToEdit', this.StoredData);
    }

    this.storedReportOverviewImage = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['storedReportOverviewImage'];

    // this.presentAlertConfirm();
  }

  showInput() {
    let item = this.createInpForm.value.WeatherConditions;
    console.log(item);
    if (item == 'Temperature') {
      this.show = true;
    } else this.show = false;
  }

  createPdf() {
    this.PreviewPDF = true;
    let an = this.config.createPdf();
    console.log(an);

    setTimeout(() => {
      //<<<---using ()=> syntax
      this.PreviewPDF = false;
    }, 3000);

    if (an['__zone_symbol__state'] == true) {
      this.PreviewPDF = false;
    }
  }

  DelImg(data_item) {
    this.storedReportOverviewImage = this.storedReportOverviewImage.filter(
      (item) => item.img !== data_item
    );

    this.StoredData.storedReportOverviewImage = this.storedReportOverviewImage;

    this.config.storageRemoveItem('InspectionToEdit');
    this.config.storageSave('InspectionToEdit', this.StoredData);
  }
}
