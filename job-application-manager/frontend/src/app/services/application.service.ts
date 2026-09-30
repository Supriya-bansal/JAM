import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Application } from '../models/application';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private readonly api = `${environment.apiUrl}/applications`;

  applications = signal<Application[]>([]);

  constructor(private http: HttpClient) {}

  loadApplications() {
    this.http.get<Application[]>(this.api).subscribe((data) => {
      this.applications.set(data);
    });
  }

  resetApplications() {
    return this.http.post(`${this.api}/reset`, {});
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
