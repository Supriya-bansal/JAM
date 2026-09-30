import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private readonly api = 'http://localhost:3000/api/applications';

  applications = signal<Application[]>([]);

  constructor(private http: HttpClient) {}

  loadApplications() {
    this.http.get<Application[]>(this.api).subscribe((data) => {
      this.applications.set(data);
    });
  }

  updateStatus(id: number, status: Application['status']) {
    this.http.patch(`${this.api}/${id}/status`, { status }).subscribe(() => {
      const updated = this.applications().map((app) =>
        app.id === id
          ? {
              ...app,
              status,
            }
          : app,
      );

      this.applications.set(updated);
    });
  }

  apply(id: number) {
    this.updateStatus(id, 'Applied');
  }
}
