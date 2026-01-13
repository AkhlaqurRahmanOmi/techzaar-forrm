import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { ContactDto } from './dto/contact.dto';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('SENDER_EMAIL'),
        pass: this.configService.get<string>('PASSWORD'),
      },
    });
  }

  async sendContactEmail(contactData: ContactDto): Promise<void> {
    const templatePath = path.join(
      process.cwd(),
      'templates',
      'contact-email.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);
    const htmlContent = template(contactData);

    const adminMailOptions = {
      from: this.configService.get<string>('SENDER_EMAIL'),
      to: this.configService.get<string>('RECIVER_EMAIL'),
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: htmlContent,
    };

    const replyTemplatePath = path.join(
      process.cwd(),
      'templates',
      'reply-email.html',
    );
    const replyHtmlContent = fs.readFileSync(replyTemplatePath, 'utf-8');

    const replyMailOptions = {
      from: this.configService.get<string>('SENDER_EMAIL'),
      to: contactData.email,
      subject: 'Thanks for contacting Techzaar Innovation',
      html: replyHtmlContent,
    };

    await Promise.all([
      this.transporter.sendMail(adminMailOptions),
      this.transporter.sendMail(replyMailOptions),
    ]);
  }

  async sendProjectEmail(projectData: ProjectDto): Promise<void> {
    const templatePath = path.join(
      process.cwd(),
      'templates',
      'project-email.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);
    const htmlContent = template(projectData);

    const adminMailOptions = {
      from: this.configService.get<string>('SENDER_EMAIL'),
      to: this.configService.get<string>('RECIVER_EMAIL'),
      subject: `New Project Inquiry from ${projectData.name}`,
      html: htmlContent,
    };

    const replyTemplatePath = path.join(
      process.cwd(),
      'templates',
      'reply-email.html',
    );
    const replyHtmlContent = fs.readFileSync(replyTemplatePath, 'utf-8');

    const replyMailOptions = {
      from: this.configService.get<string>('SENDER_EMAIL'),
      to: projectData.email,
      subject: 'Thanks for contacting Techzaar Innovation',
      html: replyHtmlContent,
    };

    await Promise.all([
      this.transporter.sendMail(adminMailOptions),
      this.transporter.sendMail(replyMailOptions),
    ]);
  }
}
