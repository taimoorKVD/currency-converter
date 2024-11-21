import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrencyService } from '../service/currency.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-converter',
  standalone: true,
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
  imports:[SharedModule],
  providers: [CurrencyService],
})
export class ConverterComponent implements OnInit {
  converterForm = new FormGroup({
    fromCurrency: new FormControl<string | null>(null),
    toCurrency: new FormControl<string | null>(null),
    amount: new FormControl<number | null>(null),
  });

  currencies: string[] = [];
  loading = false;
  conversionResult: number | null = null;
  convertedAmount: number | null = null;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getAllCurrencies();
  }

  async getAllCurrencies() {
    this.loading = true;
    try {
      const rates = await this.currencyService.getCurrencies();
      this.currencies = Object.keys(rates.data);
    } catch (error) {
      console.error('Error loading exchange rates:', error);
    } finally {
      this.loading = false;
    }
  }

  async convertCurrency() {
    if (this.converterForm.invalid) {
      return;
    };

    const from = this.converterForm.value.fromCurrency!;
    const to = this.converterForm.value.toCurrency!;
    const amount = this.converterForm.value.amount!;

    this.loading = true;
    try {
      const result = await this.currencyService.convertCurrency(from, to, amount);
      this.conversionResult = result.result;
      this.convertedAmount = result.rate;
      const conversion = {
        date: new Date().toLocaleString(),
        from,
        to,
        amount,
        result: result.result,
      };
      this.currencyService.addHistory(conversion);
    } catch (error) {
      console.error('Error converting currency:', error);
    } finally {
      this.loading = false;
    }
  }
}
