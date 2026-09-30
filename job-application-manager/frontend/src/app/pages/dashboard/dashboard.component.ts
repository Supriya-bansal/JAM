import { Component, computed, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { TemplateService } from '../../services/template.service';
import { Application } from '../../models/application';
import { AttachmentService } from '../../services/attachment.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatIcon,
    MatCard,
    MatCheckbox,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private applicationService = inject(ApplicationService);
  private templateService = inject(TemplateService);
  private attachmentService = inject(AttachmentService);

  attachments = this.attachmentService.attachments;
  applications = this.applicationService.applications;
  templates = this.templateService.templates;
  showSettings = signal(false);

  selectedAttachments = computed(() =>
    this.attachments().filter((attachment) => attachment.selected),
  );

  selectedTemplateId = signal('assistant-standard');

  applicationsSorted = computed(() =>
    [...this.applications()].sort((a, b) => a.priority - b.priority),
  );

  displayedColumns = ['priority', 'hospital', 'location', 'status', 'contacts', 'actions'];

  constructor() {
    this.applicationService.loadApplications();

    this.templateService.loadTemplates();

    this.attachmentService.loadAttachments();
  }

  apply(appId: number) {
    this.applicationService.apply(appId);
  }

  markInterview(appId: number) {
    this.applicationService.updateStatus(appId, 'Interview');
  }

  markRejected(appId: number) {
    this.applicationService.updateStatus(appId, 'Rejected');
  }

  markOffer(appId: number) {
    this.applicationService.updateStatus(appId, 'Offer');
  }

  applyAll() {
    this.applications()
      .filter((app) => app.status === 'Pending')
      .forEach((app) => {
        this.applicationService.apply(app.id);
      });
  }

  buildMailto(app: Application): string {
    const template = this.templates().find((t) => t.id === this.selectedTemplateId());

    if (!template) {
      return '';
    }

    const recipients = app.contacts.map((c) => c.email).join(';');

    const subject = this.renderTemplate(template.subject, app);

    const attachmentText = this.selectedAttachments()
      .map((attachment) => `- ${attachment.name}`)
      .join('\n');

    const body = this.renderTemplate(template.body, app) + '\n\nAnlagen:\n' + attachmentText;
    return `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  private renderTemplate(template: string, app: Application): string {
    const contact = app.contacts[0];

    return template
      .replaceAll('{{hospital}}', app.hospital)
      .replaceAll('{{location}}', app.location)
      .replaceAll('{{position}}', app.position)
      .replaceAll('{{specialty}}', app.specialty)
      .replaceAll('{{contactName}}', contact?.name ?? '')
      .replaceAll('{{contactEmail}}', contact?.email ?? '')
      .replaceAll('{{candidateName}}', 'Supriya Bansal')
      .replaceAll('{{phone}}', '+49 XXX')
      .replaceAll('{{senderEmail}}', 'your@email.com');
  }

  toggleAttachment(attachmentId: string) {
    this.attachmentService.toggleAttachment(attachmentId);
  }

  saveAttachments() {
    this.attachmentService.saveAttachments().subscribe();
  }
}
