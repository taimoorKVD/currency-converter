import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiKey = '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2';
  private baseUrl = 'https://api.freecurrencyapi.com/v1';
  private historyKey = 'currencyConversionHistory';
  private history: { date: string; from: string; to: string; amount: number; result: number }[] = [];

  constructor() {
  }

  async getCurrencies(): Promise<any> {
    const url = `${this.baseUrl}/currencies?apikey=${this.apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch currencies');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async convertCurrency(from: string, to: string, amount: number): Promise<any> {
    const url = `${this.baseUrl}/latest?apikey=${this.apiKey}&base_currency=${from}&currencies=${to}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch conversion data');
      }
      const data = await response.json();
      const rate = data.data[to];
      return { rate, result: rate * amount };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getHistory() {
    return this.history;
}

addHistory(conversion: { date: string; from: string; to: string; amount: number; result: number }) {
  this.history.push(conversion);
  localStorage.setItem(this.historyKey, JSON.stringify(this.history));
}

clearHistory() {
  this.history = [];
  localStorage.removeItem(this.historyKey);
}
}
