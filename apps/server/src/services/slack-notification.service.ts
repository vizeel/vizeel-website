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
    source?: string,
    packageSelection?: string
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

    // Add package selection information if present
    if (packageSelection) {
      try {
        const packageData = JSON.parse(packageSelection);
        const packageFields = [];
        
        packageFields.push({
          type: 'mrkdwn',
          text: `*Agent:*\n${packageData.agent || 'N/A'}`
        });
        
        packageFields.push({
          type: 'mrkdwn',
          text: `*Plan:*\n${packageData.plan || 'N/A'} - $${packageData.planPrice || 0}/month`
        });

        if (packageData.addOns && packageData.addOns.length > 0) {
          const addOnsList = packageData.addOns.map((addon: any) => 
            `• ${addon.name} - $${addon.price}${addon.type === 'Recurring' ? '/mo' : ''} (x${addon.quantity})`
          ).join('\n');
          
          packageFields.push({
            type: 'mrkdwn',
            text: `*Add-ons:*\n${addOnsList}`
          });
        }

        if (packageData.totals) {
          let totalsText = `Monthly: $${packageData.totals.monthly}`;
          if (packageData.totals.oneTime > 0) {
            totalsText += `\nOne-time Setup: $${packageData.totals.oneTime}`;
          }
          
          packageFields.push({
            type: 'mrkdwn',
            text: `*💰 Pricing:*\n${totalsText}`
          });
        }

        blocks.push({
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📦 Selected Package'
          }
        });

        blocks.push({
          type: 'section',
          fields: packageFields
        });

      } catch (error) {
        console.warn('Failed to parse package selection for Slack notification:', error);
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Package Selection:*\nRaw data: ${packageSelection}`
          }
        });
      }
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