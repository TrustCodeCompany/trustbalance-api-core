import { EmailData } from '../entities/email.entity';

export interface EmailService {
  sendEmail(emailData: EmailData): Promise<void>;
}
