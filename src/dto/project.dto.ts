import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty({
    description: 'Full name of the person',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address of the person',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Phone number of the person',
    example: '+1234567890',
    required: true,
  })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Project budget from the person',
    example: '$5,000 - $10,000',
    required: true,
  })
  @IsNotEmpty({ message: 'Project budget is required' })
  @IsString()
  project_budget: string;

  @ApiProperty({
    description: 'Optional message from the person',
    example: 'I would like to know more about your services',
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}
