export interface Application {
  id: number;
  hospital: string;
  location: string;
  position: string;
  specialty: string;

  employmentType?: string;
  startDate?: string;

  contacts: Contact[];

  applicationUrl: string;

  status: 'Pending' | 'Applied' | 'Response Received' | 'Interview' | 'Rejected' | 'Offer';

  priority: number;

  applied: boolean;
  appliedDate?: string | null;

  responseReceived: boolean;
  responseDate?: string | null;
  responseSummary?: string | null;

  selectedTemplate?: string;
  notes?: string;
}

export interface Contact {
  name?: string;
  role?: string;
  phone?: string;
  email: string;
  preferred?: boolean;
}
