import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ApiService } from './api.service';
import { CommonService } from './common.function';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,

    public config: CommonService,
    public api: ApiService
  ) {
    // this.platform.ready().then(() => {
    //   this.splashScreen.hide();
    // });

    this.GetContent();
    this.GetSettings();
  }

  async GetContent() {
    await this.api.Get_data('getalldata/dev1@gmail.com/123').subscribe(
      (res) => {
        // Loading_.dismiss();

        // console.log(JSON.stringify(res));
        this.config.commonContent = res;
        this.config._mergeAPIContentData();
      },
      (err) => {
        // Loading_.dismiss();
        console.log(JSON.stringify(err));
      }
    );

    await this.api.Get_data('getdescdata/dev1@gmail.com/123').subscribe(
      (res) => {
        // Loading_.dismiss();

        // console.log(JSON.stringify(res));
        this.config.getdescdata = res;
        this.config._mergeAPIContentData();
      },
      (err) => {
        // Loading_.dismiss();
        console.log(JSON.stringify(err));
      }
    );
  }

  async GetSettings() {
    await this.api.Get_data('getallsettings/dev1@gmail.com/123').subscribe(
      (res) => {
        // Loading_.dismiss();

        console.log(JSON.stringify(res));
        this.config.allSettingsContent = res;
      },
      (err) => {
        // Loading_.dismiss();
        console.log(JSON.stringify(err));
      }
    );
  }
}
