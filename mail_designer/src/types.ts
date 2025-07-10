
export interface EmailTemplate {
  name: string;
  owner: string;
  creation: string; // ISO datetime string
  modified: string;
  modified_by: string;
  docstatus: 0 | 1 | 2; // Draft | Submitted | Cancelled (Frappe convention)
  idx: number;
  subject: string;
  use_html: 0 | 1;
  response_html: string | null;
  response: string;
  custom_design: Record<string, unknown>|string; // assuming this is a JSON object
}
