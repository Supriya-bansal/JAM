import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { EmailTemplate } from '../models/email-template';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private readonly api = `${environment.apiUrl}/templates`;

  templates = signal<EmailTemplate[]>([]);

  constructor(private http: HttpClient) {}

  loadTemplates() {
    this.http.get<EmailTemplate[]>(this.api).subscribe((data) => {
      this.templates.set(data);
    });
  }
}
