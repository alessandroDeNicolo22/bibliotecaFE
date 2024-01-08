import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faEnvelope = faEnvelope;
  faPhone= faPhone;
  faHand = faHandSparkles;
/*   valore: boolean = false;
  valore1: boolean = false;
  cambiaValore1() {
    this.valore1 = !this.valore1
  }
  cambiaValore() {
    this.valore = !this.valore
  } */
}
