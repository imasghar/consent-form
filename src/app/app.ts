import { Component, signal } from '@angular/core';
import { BiopsyConsent } from '../components/biopsy-consent/biopsy-consent';
import { DebridementConsent } from '../components/debridement-consent/debridement-consent';
import { CTPConsent } from '../components/ctp-consent/ctp-consent';
import { ErrorScreen } from "../components/error-screen/error-screen";
@Component({
  selector: 'app-root',
  imports: [BiopsyConsent, DebridementConsent, CTPConsent, ErrorScreen],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('consent-form');
}
