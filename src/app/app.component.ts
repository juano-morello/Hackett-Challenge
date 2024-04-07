import { Component } from '@angular/core';
import {MultiAxisLineChartComponent} from "./multi-axis-line-chart/multi-axis-line-chart.component";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MultiAxisLineChartComponent, PieChartComponent, HttpClientModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HACKETT-MORELLO';
}
