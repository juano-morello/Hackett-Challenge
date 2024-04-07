import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "../data.service";
import {Chart} from "chart.js";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData()
  }

  private fetchData(): void {
    this.dataService.getCarOwnershipData().subscribe({
      next: (data) => {
        this.createChart(data);
      },
      error: (error) => {
        console.error('There was an error fetching the population data', error);
      }
    });
  }

  private createChart(data: any): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Failed to find canvas element');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const carOwnershipData2021 = data.filter((item: { Year: string; }) => item.Year === "2021");
    console.log(carOwnershipData2021);

    const carData = carOwnershipData2021.map((item: { Value: any; }) => {
      // @ts-ignore
      return isNaN(parseInt(item['Vehicles Available'].substring(0, 1), 10)) ? 0 : parseInt(item['Vehicles Available'].substring(0, 1), 10)
    });


    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: carData,
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }
}
