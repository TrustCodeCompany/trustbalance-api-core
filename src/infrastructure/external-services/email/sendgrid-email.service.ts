import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { EmailService } from '../../../domain/services/email.service.interface';
import { EmailData } from '../../../domain/entities/email.entity';

@Injectable()
export class SendGridEmailService implements EmailService {
  constructor() {
    // Configurar la API Key de SendGrid desde las variables de entorno
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  async sendEmail(emailData: EmailData): Promise<void> {
    const msg = {
      to: emailData.to,
      from: 'trustcodesac@gmail.com',
      subject: emailData.subject,
      text: emailData.text,
      html: `<p>${emailData.html}</p>`,
    };

    try {
      await SendGrid.send(msg).then(() => {
        console.log('Email sent');
      });
    } catch (error: any) {
      throw new InternalServerErrorException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Failed to send email: ${error.message}`,
      );
    }
  }
}
