import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {DataService} from "../data.service";
import {HttpClientModule} from "@angular/common/http";
Chart.register(...registerables)

@Component({
  selector: 'app-multi-axis-line-chart',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './multi-axis-line-chart.component.html',
  styleUrl: './multi-axis-line-chart.component.css'
})
export class MultiAxisLineChartComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData()
  }

  private fetchData(): void {
    this.dataService.getPopulationData().subscribe({
      next: (data) => {
        this.createChart(data);
      },
      error: (error) => {
        console.error('There was an error fetching the population data', error);
      }
    });
  }

  private createChart(data: any): void {
    const canvas = document.getElementById('multiAxisLineChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Failed to find canvas element');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const years = [...new Set(data.map((item: { Year: any; }) => item.Year))].sort();
    const states = [...new Set(data.map((item: { State: any; }) => item.State))].sort();

    const datasets = states.map(state => ({
      label: state,
      data: years.map(year => {
        const item = data.find((item: { Year: unknown; State: unknown; }) => item.Year === year && item.State === state);
        return item ? item.Population : null;
      }),
      borderColor: state === 'Alabama' ? 'red' : state === 'Florida' ? 'blue' : 'green',
      yAxisID: 'y',
    }));


    new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        // @ts-ignore
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear',
            position: 'left',
          }
        }
      }
    });
  }
}
