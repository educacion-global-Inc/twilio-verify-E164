# Twilio E.164 Phone Number Validator & Campaign Sender

A comprehensive web-based tool to validate and format phone numbers according to the E.164 international standard, with integrated Twilio messaging capabilities for WhatsApp and SMS campaigns.

## 🌟 Features

### Basic Validator (index.html)
- ✅ Single phone number validation
- 🎨 Real-time visual feedback
- 📋 Copy to clipboard functionality
- 🔒 XSS protection with HTML escaping
- 📱 Fully responsive design

### Campaign Validator (campaign.html)
- ✅ Bulk phone number validation
- 📤 File upload support (TXT/CSV)
- 🔄 Duplicate detection and removal
- 📊 Statistics dashboard
- 📥 Export results (TXT/CSV)
- 🔐 Secure client-side validation

### NEW: Twilio Integration (via Node.js Backend)
- 🔧 Twilio credentials management (stored in localStorage)
- 📲 WhatsApp message sending
- 💬 SMS message sending
- 🔍 Phone number verification via Twilio Lookup API
- 🎯 Campaign ID support
- 📨 Free-form message text
- 📈 Real-time sending progress
- ✅ Delivery status tracking

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Twilio account with Account SID and Auth Token

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/educacion-global-Inc/twilio-verify-E164.git
cd twilio-verify-E164
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:3000
```

## 📖 Usage

### Basic Phone Number Validation

1. Open `http://localhost:3000` in your browser
2. Enter a phone number in E.164 format (e.g., `+14155552671`)
3. Click "Validate Number"
4. Copy the validated number if needed

### Campaign Validation

1. Navigate to "Campaign Mode" or open `http://localhost:3000/campaign`
2. Enter multiple phone numbers (one per line) or upload a CSV/TXT file
3. Choose options:
   - Remove Duplicates
   - Add Country Code Prefix
   - Verify with Twilio API (requires configuration)
4. Click "Validate Numbers"
5. Review statistics and download results

### Twilio Integration Setup

1. **Configure Twilio Credentials**
   - In campaign.html, click on the "🔧 Twilio Configuration" section
   - Enter your Account SID (starts with "AC")
   - Enter your Auth Token
   - Enter your From Number in E.164 format
   - Click "💾 Save Configuration"
   - Credentials are saved in browser's localStorage

2. **Verify Phone Numbers (Optional)**
   - Check "Verify with Twilio API" option
   - This uses Twilio Lookup API to verify if numbers are valid
   - Provides additional information (carrier, line type)

3. **Send Campaign Messages**
   - Configure your message:
     - Select message type (WhatsApp or SMS)
     - Add optional Campaign ID
     - Enter your message text
   - Validate phone numbers first
   - Click "🚀 Send Campaign"
   - Monitor progress in real-time
   - Review sent messages in the "📤 Sent Messages" tab

## 🔧 Configuration

### Twilio Credentials

Credentials are stored locally in your browser's localStorage. They are never transmitted except to Twilio's API endpoints.

**Required:**
- Account SID: Your Twilio Account SID (format: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
- Auth Token: Your Twilio Auth Token
- From Number: Your Twilio phone number in E.164 format (e.g., `+14155552671`)

**For WhatsApp:**
- Your From Number must be a Twilio WhatsApp-enabled number
- Recipients must have opted into your WhatsApp sender

**For SMS:**
- Your From Number must be a valid Twilio SMS-capable number

### Server Configuration

The Node.js server runs on port 3000 by default. To change:

```bash
PORT=8080 npm start
```

## 📡 API Endpoints

The server exposes the following API endpoints:

### POST `/api/verify-phone`
Verify a phone number using Twilio Lookup API

**Request Body:**
```json
{
  "phoneNumber": "+14155552671",
  "accountSid": "ACxxxx",
  "authToken": "your_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "phoneNumber": "+14155552671",
    "valid": true,
    "countryCode": "US",
    "nationalFormat": "(415) 555-2671",
    "lineType": "mobile",
    "carrier": "Verizon"
  }
}
```

### POST `/api/send-whatsapp`
Send a WhatsApp message

**Request Body:**
```json
{
  "to": "+14155552671",
  "from": "+14155559999",
  "message": "Hello!",
  "accountSid": "ACxxxx",
  "authToken": "your_token",
  "campaignId": "SUMMER2024" // optional
}
```

### POST `/api/send-sms`
Send an SMS message

**Request Body:** (same as WhatsApp)

### GET `/api/health`
Health check endpoint

## 🔒 Security

### Data Privacy
- **No server-side storage**: All credentials and data are stored client-side
- **LocalStorage only**: Credentials never leave your browser except for API calls
- **XSS Protection**: All user input is HTML-escaped
- **No external dependencies**: Pure JavaScript implementation

### Best Practices
1. Never share your Auth Token
2. Use environment-specific credentials for testing
3. Rotate your Auth Token regularly
4. Monitor your Twilio usage dashboard

## 📊 E.164 Format Rules

The E.164 format is the international telephone numbering plan standard:

**Format**: `+[country code][subscriber number]`

**Rules:**
- Must start with `+` sign
- Country code: 1-3 digits
- Total length: 1-15 digits (excluding +)
- No spaces, dashes, or special characters
- Only digits after the `+`

**Examples:**
- ✅ Valid: `+14155552671` (USA)
- ✅ Valid: `+525555551234` (Mexico)
- ✅ Valid: `+442071838750` (UK)
- ❌ Invalid: `(415) 555-2671` (formatting)
- ❌ Invalid: `14155552671` (missing +)

## 🛠️ Development

### Project Structure
```
twilio-verify-E164/
├── server.js           # Node.js Express server
├── package.json        # Node.js dependencies
├── index.html          # Basic validator UI
├── campaign.html       # Campaign validator UI
├── PRD.md              # Product Requirements Document
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

### Dependencies
- `express`: Web server framework
- `axios`: HTTP client for Twilio API calls
- `cors`: Enable CORS for API requests
- `body-parser`: Parse JSON request bodies

### Adding Features
1. Create a new API endpoint in `server.js`
2. Add corresponding UI in `campaign.html`
3. Update this README with usage instructions

## 📝 Changelog

### Version 1.1.0 (Current)
- ✨ Added Node.js backend with Express
- ✨ Integrated Twilio Lookup API for phone verification
- ✨ Added WhatsApp message sending
- ✨ Added SMS message sending
- ✨ Campaign ID support
- ✨ LocalStorage credentials management
- ✨ Real-time sending progress
- ✨ Delivery status tracking

### Version 1.0.0
- ✅ Basic E.164 validation
- ✅ Campaign bulk validation
- ✅ File upload support
- ✅ Duplicate detection
- ✅ Export functionality

## ❓ FAQ

**Q: Do I need a Twilio account?**
A: Only if you want to use the messaging features. The validation works without Twilio.

**Q: Where are my credentials stored?**
A: In your browser's localStorage. They never leave your machine except when calling Twilio APIs.

**Q: Can I use this without the Node.js server?**
A: Yes, but only for validation. Messaging features require the server.

**Q: How many messages can I send?**
A: Limited only by your Twilio account limits and rate limits.

**Q: Is this production-ready?**
A: This is designed as a local tool. For production, add authentication, rate limiting, and proper error handling.

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Support

For Twilio-specific issues, consult the [Twilio Documentation](https://www.twilio.com/docs)

For issues with this tool, please open an issue on GitHub.

## 🙏 Acknowledgments

- Twilio for providing robust messaging APIs
- The E.164 standard for international phone number formatting
