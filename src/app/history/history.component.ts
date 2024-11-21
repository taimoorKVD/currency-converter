import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../service/currency.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-history',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  conversionHistory: { date: string; from: string; to: string; amount: number; result: number }[] = [];
  private historyKey = 'currencyConversionHistory';
  constructor(private _currencyService: CurrencyService) {}

  ngOnInit(): void {
    const savedHistory = localStorage.getItem(this.historyKey);
    if (savedHistory) {
      this.conversionHistory = JSON.parse(savedHistory);
    }
  }

  clearHistory() {
    this._currencyService.clearHistory();
    this.conversionHistory = [];
  }
}
