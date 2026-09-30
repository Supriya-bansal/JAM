import { Attachment } from '../models/attachment';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private readonly api = 'http://localhost:3000/api/attachments';

  attachments = signal<Attachment[]>([]);

  constructor(private http: HttpClient) {}

  loadAttachments() {
    this.http.get<Attachment[]>(this.api).subscribe((data) => {
      this.attachments.set(data);
    });
  }

  saveAttachments() {
    return this.http.patch(this.api, this.attachments());
  }

  toggleAttachment(id: string) {
    const updated = this.attachments().map((attachment) => {
      if (attachment.id === id) {
        return {
          ...attachment,
          selected: !attachment.selected,
        };
      }

      return attachment;
    });

    this.attachments.set(updated);
  }
}
