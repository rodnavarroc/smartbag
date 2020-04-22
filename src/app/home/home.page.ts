import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public authservice : AuthService, public alertController: AlertController, private faio: FingerprintAIO, private bluetoothSerial: BluetoothSerial, private toastCtrl: ToastController) {}

  onLogout()
  {
  	this.authservice.logout();
  }

  async InfoHuella() {
    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Huellas Digitales',
      message: 'Las huellas digitales registradas en este equipo funcionarán dentro de esta aplicación.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async InfoHistorial() {
    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Historial de actividad',
      message: '- La maleta fue abierta<br>[08/03/20 1:48 PM]<br><br>- La maleta fue movida<br>[03/03/20 6:12 AM]<br>',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async InfoSeguridad() {
    const alert = await this.alertController.create({
      header: 'SmartBag',
      subHeader: 'Consejos de seguridad',
      message: '- Manténgase siempre cerca de su maleta.<br><br>- No abandone su maleta en lugares concurridos sin seguridad.<br><br>- Compruebe frecuentemente si su maleta permanece donde la dejó. <br><br><small><center>SmartBag no garantiza la plena seguridad de su maleta, es solamente una herramienta para su protección.<br><br></center></small>',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  AccesoHuellaBM()
  {
   this.faio.show({
   title: 'Autenticación Biométrica', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
   subtitle: 'Se requiere autenticación para realizar esta acción', // (Android Only) | optional | Default: null
   description: 'Por favor, identifíquese', // optional | Default: null
   fallbackButtonTitle: 'Utilizar Pin', // optional | When disableBackup is false defaults to "Use Pin". // When disableBackup is true defaults to "Cancel"
   disableBackup:false,  // optional | default: false
   })
  .then((result: any) => this.sendDataBloquear())
  .catch((error: any) => console.log(error));
  }

  AccesoHuellaDM()
  {
   this.faio.show({
   title: 'Autenticación Biométrica', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
   subtitle: 'Se requiere autenticación para realizar esta acción', // (Android Only) | optional | Default: null
   description: 'Por favor, identifíquese', // optional | Default: null
   fallbackButtonTitle: 'Utilizar Pin', // optional | When disableBackup is false defaults to "Use Pin". // When disableBackup is true defaults to "Cancel"
   disableBackup:false,  // optional | default: false
   })
  .then((result: any) => this.sendDataDesbloquear())
  .catch((error: any) => console.log(error));
  } 

  sendDataDesbloquear() {
    let dataSend = 'off';
    //this.showToast(dataSend);

    this.bluetoothSerial.write(dataSend).then(success => {
      this.showToast('La maleta se ha desbloqueado');
    }, error => {
      this.showError(error)
    });
  }

  sendDataBloquear() {
    let dataSend = 'on';
   // this.showToast(dataSend);

    this.bluetoothSerial.write(dataSend).then(success => {
      this.showToast('La maleta se ha bloqueado');
    }, error => {
      this.showError(error)
    });
  }

  async showError(error) {
    let alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    await toast.present();

  }

}