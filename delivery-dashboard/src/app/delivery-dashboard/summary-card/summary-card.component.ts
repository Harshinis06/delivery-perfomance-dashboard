import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryDetails } from '../../models/delivery-details';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {
  @Input() dataSource: MatTableDataSource<DeliveryDetails> = new MatTableDataSource<DeliveryDetails>([]);

  get OnTimeDeliveries(): number {
    return this.dataSource.data.filter(delivery => delivery.deliveredDate === delivery.estimatedDate).length;
  }

  get DelayedDeliveries(): number {
    return this.dataSource.data.filter(delivery => delivery.status === 'Delayed').length;
  }

}
