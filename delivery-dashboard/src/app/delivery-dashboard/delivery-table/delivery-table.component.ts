import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { DeliveryDetails } from '../../models/delivery-details';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-delivery-table',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './delivery-table.component.html',
  styleUrl: './delivery-table.component.scss'
})
export class DeliveryTableComponent implements AfterViewInit {
  @Input() dataSource: DeliveryDetails[] = [];
  @Input() tableData: MatTableDataSource<DeliveryDetails> = new MatTableDataSource<DeliveryDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['orderId', 'agentName', 'from', 'to', 'estimatedDate', 'deliveredDate', 'status'];
  
  ngAfterViewInit() {
    if(!this.dataSource)
    this.tableData.paginator = this.paginator;
  }

}
