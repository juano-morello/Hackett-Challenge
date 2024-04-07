import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string = 'https://datausa.io/api/data';

  constructor(private http: HttpClient) { }

  getPopulationData(): Observable<any> {
    const queryParams: string = '?drilldowns=State&measures=Population';
    return this.http.get(`${this.baseUrl}${queryParams}`).pipe(
      map(response => {
        // @ts-ignore
        const filtered = response.data.filter(item => {
          const year = parseInt(item.Year, 10);
          return year >= 2013 && year <= 2021 && (item.State === "Alabama" || item.State === "Florida" || item.State === "California");
        })
        // console.log(filtered);
        return filtered;
      })
    );
  }
  getCarOwnershipData(): Observable<any> {
    const endpoint = 'https://zircon.datausa.io/api/data?measure=Commute%20Means%20by%20Gender,Commute%20Means%20by%20Gender%20Moe&geo=01000US,01000US&drilldowns=Vehicles%20Available'
    return this.http.get(endpoint).pipe(
      map(response => {
        // console.log(response);
        // @ts-ignore
        return response.data;
      })
    )
  }
}
