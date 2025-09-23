// lib/templates/contact_template.ts
export const generateContactEmailHTML = (
  name: string,
  email: string,
  subject: string,
  message: string,
  serviceType: string,
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - Dapp Mentors</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background-color: #0a0a0a;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #1a1a1a;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #2a2a2a;
        }
        
        .header {
            padding: 50px 40px 30px 40px;
            text-align: center;
            background: transparent;
        }
        
        .logo {
            max-width: 150px;
            height: auto;
            border-radius: 16px;
            margin: 0 auto 20px;
        }
        
        .header-title {
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        
        .header-subtitle {
            color: #9ca3af;
            font-size: 16px;
            font-weight: 400;
        }
        
        .content {
            padding: 20px 40px 40px 40px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 24px;
        }
        
        .message {
            font-size: 16px;
            color: #d1d5db;
            margin-bottom: 32px;
            line-height: 1.7;
        }
        
        .contact-card {
            background-color: #242424;
            border-radius: 12px;
            padding: 24px;
            margin: 32px 0;
            border: 1px solid #333333;
        }
        
        .contact-card h3 {
            color: #ffffff;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .contact-card p {
            color: #9ca3af;
            font-size: 14px;
            margin-bottom: 16px;
        }
        
        .contact-info {
            background-color: #1f2937;
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;
        }
        
        .contact-info strong {
            color: #D2145A;
        }
        
        .footer {
            background-color: #141414;
            padding: 40px;
            text-align: center;
            border-top: 1px solid #2a2a2a;
        }
        
        .footer-text {
            font-size: 14px;
            color: #9ca3af;
            margin-bottom: 24px;
        }
        
        .footer-text a {
            color: #D2145A;
            text-decoration: none;
        }
        
        .disclaimer {
            font-size: 12px;
            color: #6b7280;
            margin-top: 32px;
            line-height: 1.6;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 0;
                border-radius: 0;
                border: none;
            }
            
            .header,
            .content,
            .footer {
                padding-left: 24px;
                padding-right: 24px;
            }
            
            .header {
                padding-top: 40px;
                padding-bottom: 24px;
            }
            
            .logo {
                max-width: 120px;
                margin-bottom: 16px;
            }
            
            .header-title {
                font-size: 22px;
                line-height: 1.2;
                margin-bottom: 12px;
            }
            
            .header-subtitle {
                font-size: 15px;
                line-height: 1.4;
                padding: 0 8px;
            }
            
            .greeting {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${process.env.NEXT_PUBLIC_APP_URL}/assets/images/logo.png" alt="Dapp Mentors" class="logo">
            <div class="header-title">Dapp Mentors</div>
            <div class="header-subtitle">New Contact Form Submission</div>
        </div>
        
        <div class="content">
            <div class="greeting">New Message Received!</div>
            
            <div class="message">
                A new contact form submission has been received from the Dapp Mentors website. Please review the details below.
            </div>
            
            <div class="contact-card">
                <h3>Submission Details</h3>
                <div class="contact-info">
                    <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
                </div>
                <div class="contact-info">
                    <p><strong>Subject:</strong> ${subject}</p>
                </div>
                <div class="contact-info">
                    <p><strong>Service Type:</strong> ${serviceType}</p>
                </div>
                <div class="contact-info">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; color: #d1d5db;">${message}</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                <strong>Need help?</strong> Contact our support team at 
                <a href="mailto:contact@dappmentors.org">contact@dappmentors.org</a>
            </div>
            
            <div class="disclaimer">
                This email was sent from a notification-only address that cannot accept incoming email. 
                Please do not reply to this message.
                
                © 2025 Dapp Mentors. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
  `.trim();
};
