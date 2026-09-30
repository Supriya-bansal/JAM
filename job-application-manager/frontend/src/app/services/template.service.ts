import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { EmailTemplate } from '../models/email-template';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private readonly api = 'http://localhost:3000/api/templates';

  templates = signal<EmailTemplate[]>([]);

  constructor(private http: HttpClient) {}

  loadTemplates() {
    this.http.get<EmailTemplate[]>(this.api).subscribe((data) => {
      this.templates.set(data);
    });
  }
}
