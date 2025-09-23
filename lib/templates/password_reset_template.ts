export const generatePasswordResetEmailHTML = (
  name: string,
  resetUrl: string,
  subject: string,
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Dapp Mentors</title>
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
        
        .cta-container {
            text-align: center;
            margin: 32px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #D2145A 0%, #FF4081 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px 0 rgba(210, 20, 90, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px 0 rgba(210, 20, 90, 0.4);
        }
        
        .verification-card {
            background-color: #242424;
            border-radius: 12px;
            padding: 24px;
            margin: 32px 0;
            border: 1px solid #333333;
        }
        
        .verification-card h3 {
            color: #ffffff;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .verification-card p {
            color: #9ca3af;
            font-size: 14px;
            margin-bottom: 16px;
        }
        
        .verification-card .link {
            color: #D2145A;
            word-break: break-all;
            text-decoration: none;
            font-size: 14px;
        }
        
        .security-notice {
            background-color: #1f2937;
            border-left: 4px solid #D2145A;
            padding: 20px;
            border-radius: 8px;
            margin-top: 32px;
        }
        
        .security-notice p {
            font-size: 14px;
            color: #d1d5db;
            margin: 0;
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
        
        .social-links {
            margin: 24px 0;
            display: flex;
            justify-content: center;
            gap: 24px;
            flex-wrap: wrap;
        }
        
        .social-links a {
            color: #9ca3af;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.2s ease;
        }
        
        .social-links a:hover {
            color: #D2145A;
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
            
            .cta-button {
                display: block;
                width: 100%;
                padding: 18px 24px;
            }
            
            .social-links {
                flex-direction: column;
                gap: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${process.env.NEXT_PUBLIC_APP_URL}/assets/images/logo.png" alt="Dapp Mentors" class="logo">
            <div class="header-title">Dapp Mentors</div>
            <div class="header-subtitle">${subject}</div>
        </div>
        
        <div class="content">
            <div class="greeting">Hi ${name}! 👋</div>
            
            <div class="message">
                You have requested to reset your password for your <strong>Dapp Mentors</strong> account. We're here to help you get back in securely.
            </div>
            
            <div class="verification-card">
                <h3>🔑 Password Reset Requested</h3>
                <p>We've sent a reset link to your email address. Click the link below to create a new password.</p>
            </div>
            
            <div class="cta-container">
                <a href="${resetUrl}" class="cta-button">
                    🔑 Reset Password
                </a>
            </div>
            
            <div class="verification-card">
                <h3>🔗 Alternative Access</h3>
                <p>Button not working? Copy and paste this link into your browser:</p>
                <a href="${resetUrl}" class="link">${resetUrl}</a>
            </div>
            
            <div class="security-notice">
                <p><strong>⚠️ Important:</strong> This reset link will expire in 1 hour for security reasons. If you didn't request a password reset, please ignore this email and consider securing your account.</p>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                <strong>Need help?</strong> Contact our support team at 
                <a href="mailto:contact@dappmentors.org">contact@dappmentors.org</a>
            </div>
            
            <div class="social-links">
                <a href="https://discord.gg/PgFDUVT6n9">💬 Discord</a>
                <a href="https://youtube.com/@dappmentors?sub_confirmation=1">🎥 YouTube</a>
                <a href="https://linkedin.com/company/dappmentors">💼 LinkedIn</a>
                <a href="https://twitter.com/iDaltonic">📱 X</a>
            </div>
            
            <div class="disclaimer">
                This email was sent from a notification-only address that cannot accept incoming email. 
                Please do not reply to this message.
                <br><br>
                © 2025 Dapp Mentors. All rights reserved.
                <br>
                You're receiving this email because a password reset was requested for your account at dappmentors.org
            </div>
        </div>
    </div>
</body>
</html>
  `.trim();
};
