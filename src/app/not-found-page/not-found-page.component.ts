import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  animations: [
    trigger('titleAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('500ms ease-in')),
    ]),
  ]
})
export class NotFoundPageComponent {
constructor(private router: Router){}

ngOnInit() {
  setTimeout(() => {
    this.titleState = 'visible';
  }, 500);

}

titleState: string = 'hidden';

home(){
  this.router.navigate(['home'])
}
}
