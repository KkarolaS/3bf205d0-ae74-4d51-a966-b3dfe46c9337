import { Component, OnInit } from '@angular/core';
import { GetService } from '../shared/get.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent implements OnInit {
  constructor(private getService: GetService) {}

  ngOnInit() {
    this.getService.onFetchPost();
  }
}
