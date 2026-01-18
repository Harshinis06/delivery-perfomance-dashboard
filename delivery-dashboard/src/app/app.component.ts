import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeliveryDashboardComponent } from './delivery-dashboard/delivery-dashboard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DeliveryDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'delivery-dashboard';
}

