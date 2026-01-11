import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ContactDto } from './dto/contact.dto';
import { ProjectDto } from './dto/project.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('contact')
  @HttpCode(HttpStatus.OK)
  async sendContactEmail(
    @Body() contactData: ContactDto,
  ): Promise<{ message: string }> {
    try {
      await this.appService.sendContactEmail(contactData);
      return {
        message: 'Contact form submitted successfully. We will get back to you soon!',
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('project')
  @HttpCode(HttpStatus.OK)
  async sendProjectEmail(
    @Body() projectData: ProjectDto,
  ): Promise<{ message: string }> {
    try {
      await this.appService.sendProjectEmail(projectData);
      return {
        message: 'Project inquiry submitted successfully. We will get back to you soon!',
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTest() {
    return 'Hello World';
  }
}
