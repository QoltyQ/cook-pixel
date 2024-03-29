import { HttpException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'janathan186@gmail.com',
    pass: 'mxwj nxud hzub xgan',
  },
});

export const sendEmail = async (data: any, code: string) => {
  try {
    const mailOptions = {
      from: 'janathan186@gmail.com',
      to: data.login,
      subject: 'Confirm Email',
      text: `Registration: ${code}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new HttpException('Failed to send email', 500);
  }
};

export const sendEmailPassword = async (data: any, password: string) => {
  try {
    const mailOptions = {
      from: 'janathan186@gmail.com',
      to: data.login,
      subject: 'Password generated successfully',
      text: `Password: ${password}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new HttpException('Failed to send email', 500);
  }
};
