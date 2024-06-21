import { Component, OnInit, ViewChild } from '@angular/core';
// import { Component, ViewChild } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { CountUp } from 'countup.js';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // @Component({selector: 'ngbd-carousel-pause', templateUrl: './carousel-pause.html'})
})
export class HomeComponent implements OnInit {
  images = [
    '../assets/banner1.jpg',
    '../assets/banner2.jpg',
    // '../assets/banner3.jpg',
    '../images/handbag.jpg',
    '../assets/banner4.jpg',
    '../assets/banner5.jpg',
  ];
  // captions=['one','two','three','four','five']
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  constructor() {}

  ngOnInit(): void {}
  // var numAnim = new countUp.CountUp('myTarget', 2000);
  // numAnim.start();
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
