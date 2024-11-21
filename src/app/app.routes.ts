import { Routes } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
    { path: '', redirectTo: 'converter', pathMatch: 'full' },
    { path: 'converter', component: ConverterComponent },
    { path: 'history', component: HistoryComponent },
];
