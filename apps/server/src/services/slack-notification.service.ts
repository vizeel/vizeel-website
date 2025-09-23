import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SlackNotificationService {
  private readonly webhookUrl: string;

  constructor() {
    this.webhookUrl = process.env.SLACK_WEBHOOK_URL;
  }

  async sendWaitlistNotification(
    email: string,
    name?: string,
    phone?: string,
    message?: string,
    company?: string,
    source?: string
  ): Promise<void> {
    if (!this.webhookUrl) {
      console.warn('SLACK_WEBHOOK_URL not configured. Skipping Slack notification.');
      return;
    }

    const fields = [
      {
        type: 'mrkdwn',
        text: `*Name:*\n${name || 'Not provided'}`
      },
      {
        type: 'mrkdwn',
        text: `*Email:*\n${email}`
      }
    ];

    if (phone) {
      fields.push({
        type: 'mrkdwn',
        text: `*Phone:*\n${phone}`
      });
    }

    if (company) {
      fields.push({
        type: 'mrkdwn',
        text: `*Company:*\n${company}`
      });
    }

    if (source) {
      fields.push({
        type: 'mrkdwn',
        text: `*Source:*\n${source}`
      });
    }

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎉 New Waitlist Signup!'
        }
      },
      {
        type: 'section',
        fields: fields
      }
    ];

    if (message) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n${message}`
        }
      });
    }

    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Signed up at ${new Date().toLocaleString()}`
        }
      ]
    } as any);

    const slackMessage = {
      text: `🎉 New Waitlist Signup!`,
      blocks: blocks
    };

    try {
      await axios.post(this.webhookUrl, slackMessage);
      console.log('Slack notification sent successfully');
    } catch (error) {
      console.error('Failed to send Slack notification:', error.response?.data || error.message);
    }
  }
}