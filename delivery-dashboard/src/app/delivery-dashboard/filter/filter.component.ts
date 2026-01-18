import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DeliveryDetails } from '../../models/delivery-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnChanges {

  @Input() dataSource: DeliveryDetails[] = [];
  @Output() filteredData = new EventEmitter<DeliveryDetails[]>();

  selectedStatus = '';
  statuses: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']?.currentValue?.length) {
      this.statuses = [...new Set(this.dataSource.map(d => d.status))];

      // restore saved filter
      const savedStatus = localStorage.getItem('delivery_status');
      if (savedStatus) {
        this.selectedStatus = savedStatus;
        this.onFilterChange(savedStatus);
      }
      this.filteredData.emit(this.dataSource);
    }
  }

  onFilterChange(selectedStatus: string) {
    localStorage.setItem('delivery_status', selectedStatus);

    const filtered = selectedStatus
      ? this.dataSource.filter(item => item.status === selectedStatus)
      : this.dataSource;

    this.filteredData.emit(filtered);
  }
}
