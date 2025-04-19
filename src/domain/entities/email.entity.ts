export interface EmailData {
  to: string | string[];
  from: string;
  subject: string;
  text?: string;
  html: string;
}
