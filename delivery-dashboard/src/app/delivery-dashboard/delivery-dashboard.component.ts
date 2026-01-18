import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { DeliveryDetails } from '../models/delivery-details';
import { Observable } from 'rxjs';
import { DeliveryServiceService } from '../services/delivery-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ArcElement, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  PieController,
  BubbleController,
  CategoryScale,
  LinearScale,
  PointElement, Legend,
  Tooltip, DoughnutController, BarController
} from 'chart.js/auto'
import { DeliveryTableComponent } from './delivery-table/delivery-table.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { FilterComponent } from './filter/filter.component';

Chart.register(
  PieController,
  BubbleController,
  PointElement,
  CategoryScale,
  LinearScale, ArcElement,
  Legend,
  Tooltip, BarController, DoughnutController
);

@Component({
  selector: 'app-delivery-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    BaseChartDirective,
    DeliveryTableComponent,
    SummaryCardComponent, FilterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DeliveryServiceService],
  templateUrl: './delivery-dashboard.component.html',
  styleUrl: './delivery-dashboard.component.scss'
})
export class DeliveryDashboardComponent implements OnInit {

  dataSource = new MatTableDataSource<DeliveryDetails>([]);
  filteredData: DeliveryDetails[] = [];

  selectedMenu: string = 'home';
  constructor(private deliveryService: DeliveryServiceService) { }

  ngOnInit() {
    const storedData = localStorage.getItem('deliveries');
    if (storedData) {
      const data = JSON.parse(storedData);
      this.dataSource.data = data;
      this.filteredData = data;
      this.updateChartData(data);
      console.log('Data from localStorage:', data);
    }
    this.fetchData().subscribe(data => {
      localStorage.setItem('deliveries', JSON.stringify(data));
      this.dataSource.data = data;
      this.filteredData = data;
      console.log(data);
      this.updateChartData(data);
    });

  }

  fetchData(): Observable<DeliveryDetails[]> {
    return this.deliveryService.getDeliveries();
  }
  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  onFilteredData(filteredData: DeliveryDetails[]) {
    console.log('Filtered data received in parent:', filteredData);
    this.filteredData = filteredData;
    this.updateChartData(filteredData);
  }

  pieChartLabels: string[] = ['Delivered', 'Pending', 'Delayed'];
  public pieChartData: ChartConfiguration<'pie'>['data']['datasets'] = [
    {
      data: [0, 0, 0],
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D']
    }
  ];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        enabled: true
      }
    }
  };

  barChartLabels: string[] = ['Delivered', 'Pending', 'Delayed'];
  public barChartData: any = [
    {
      label: 'Delivery Status',
      data: [0, 0, 0],
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D']
    }
  ];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {

        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 20
          }
        }
      }
    }
  };

  donutChartLabels: string[] = ['Delivered', 'Pending', 'Delayed'];
  donutChartType: 'doughnut' = 'doughnut';
  public donutChartData: any = [
    {
      data: [0, 0, 0],
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
    }
  ]

  public donutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      }
    }
  };
  updateChartData(data: DeliveryDetails[]) {
    const delivered = data.filter(d => d.status === 'Delivered').length;
    const pending = data.filter(d => d.status === 'Pending').length;
    const delayed = data.filter(d => d.status === 'Delayed').length;

    this.pieChartData[0].data = [delivered, pending, delayed];
    this.barChartData[0].data = [delivered, pending, delayed];
    this.donutChartData[0].data = [delivered, pending, delayed];
  }
}
