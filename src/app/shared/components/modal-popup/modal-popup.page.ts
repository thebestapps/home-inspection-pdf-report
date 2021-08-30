import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
})
export class ModalPopupPage implements OnInit {
  fontColor = '#ffffff';
  fontValue = 18;
  @Input() data: any;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    // console.log('Input data ', this.data);
    this.setDefaults();
   }

  setDefaults() {
    if (this.data) {
      this.fontColor = this.data.font_color || '#ffffff';
      this.fontValue = this.data.font_size || '18';
    }
  }

  async closeModel(data?) {
    const value = data || false;
    await this.modalController.dismiss(value);
  }

  colorChangeEvent() {
    console.log(this.fontColor)
  }

  getFontSize(e) {
    console.log(e.detail.value);
    this.fontValue = e.detail.value;
  }

  updateData() {
    let obj = {
      font_size: this.fontValue,
      font_color: this.fontColor
    };
    this.closeModel(obj);
  }

}
