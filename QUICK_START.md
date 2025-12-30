# 🚀 Quick Start Guide

Get started with the Twilio E.164 Campaign Validator & Sender in 5 minutes!

## Prerequisites

- Node.js v14+ installed
- A Twilio account ([sign up here](https://www.twilio.com/try-twilio))
- Your Twilio credentials ready

## Step 1: Installation

```bash
# Clone the repository
git clone https://github.com/educacion-global-Inc/twilio-verify-E164.git
cd twilio-verify-E164

# Install dependencies
npm install
```

## Step 2: Start the Server

```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Open http://localhost:3000 to use the validator
```

## Step 3: Open in Browser

Open your browser and navigate to:
- **Basic Validator**: http://localhost:3000
- **Campaign Validator**: http://localhost:3000/campaign
- **Enhanced Campaign**: http://localhost:3000/enhanced-campaign.html

## Step 4: Configure Twilio Credentials

### Get Your Twilio Credentials

1. Log in to your [Twilio Console](https://console.twilio.com/)
2. Find your **Account SID** (starts with "AC")
3. Find your **Auth Token** (click to reveal)
4. Note your **Phone Number** or WhatsApp sender

### Enter in the App

In the Enhanced Campaign page:

1. Click on the **Twilio Configuration** section
2. Enter your **Account SID** (e.g., `AC1234567890123456789012345678901234`)
3. Enter your **Auth Token**
4. Enter your **From Number** in E.164 format (e.g., `+14155552671`)
5. Click **Save Configuration**
6. Status should change to "✓ Configured"

✅ Your credentials are stored locally in your browser and never leave your machine!

## Step 5: Validate Phone Numbers

### Basic Validation (No Twilio Required)

1. Enter phone numbers in the textarea (one per line):
```
+14155552671
+525555551234
+442071838750
```

2. Click **Validate Numbers**
3. See results showing valid and invalid numbers

### API Verification (Requires Twilio)

1. Check the "Verify with Twilio API" option
2. Validate numbers as above
3. Get enhanced information (carrier, line type)

## Step 6: Send Campaign

### Configure Your Message

1. **Message Type**: Select WhatsApp or SMS
2. **Campaign ID** (optional): Enter like "SUMMER2024"
3. **Message Text**: Enter your message

### Send Messages

1. Make sure you have valid numbers validated
2. Click **Send Campaign**
3. Confirm in the popup dialog
4. Watch real-time progress
5. Review results

## 📱 Example Workflows

### Workflow 1: Quick Phone Validation

```
1. Open http://localhost:3000
2. Enter: +14155552671
3. Click "Validate Number"
4. ✓ Valid - copy to clipboard
```

### Workflow 2: Bulk Validation

```
1. Open http://localhost:3000/enhanced-campaign.html
2. Paste 100 numbers
3. Click "Validate Numbers"
4. Download valid numbers as CSV
```

### Workflow 3: Send WhatsApp Campaign

```
1. Configure Twilio credentials
2. Enter phone numbers
3. Select "WhatsApp"
4. Write message
5. Click "Send Campaign"
6. Monitor progress
7. Review sent messages
```

## 🔧 Troubleshooting

### Server Won't Start

**Error**: `Port 3000 is already in use`

**Solution**: Change port
```bash
PORT=8080 npm start
```

### Configuration Not Saving

**Error**: Credentials don't persist

**Solution**: Check browser localStorage is enabled
```javascript
// Open browser console
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test')); // Should show 'value'
```

### API Calls Failing

**Error**: `Failed to fetch` or Network Error

**Solution**: Check server is running
```bash
curl http://localhost:3000/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Twilio Authentication Error

**Error**: `Error 20003: Authenticate`

**Solutions**:
1. Verify Account SID starts with "AC"
2. Check Auth Token is correct (no extra spaces)
3. Ensure credentials are from the same account
4. Try regenerating Auth Token in Twilio Console

### WhatsApp Send Fails

**Error**: `Error 63016: WhatsApp policy violation`

**Solutions**:
1. Ensure From Number is WhatsApp-enabled
2. Verify recipient opted into your sender
3. Check message template requirements
4. Review [WhatsApp policies](https://www.twilio.com/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates)

### Invalid Phone Number

**Error**: `Error 21211: Invalid 'To' Phone Number`

**Solutions**:
1. Verify E.164 format: `+[country][number]`
2. Remove spaces, dashes, parentheses
3. Check country code is correct
4. Ensure number length is valid for country

## 💡 Tips & Best Practices

### Credentials Management

✅ **DO**:
- Use test credentials for development
- Rotate Auth Token regularly
- Clear localStorage after testing
- Monitor Twilio usage dashboard

❌ **DON'T**:
- Share credentials publicly
- Commit credentials to git
- Use production credentials for testing
- Store credentials in code

### Campaign Sending

✅ **DO**:
- Start with small test campaigns (5-10 numbers)
- Verify numbers before sending
- Add meaningful Campaign IDs
- Monitor rate limits
- Check message delivery status in Twilio

❌ **DON'T**:
- Send without testing first
- Ignore rate limit errors
- Send spam or unsolicited messages
- Skip WhatsApp opt-in requirements

### Phone Validation

✅ **DO**:
- Always validate before sending
- Use API verification for critical campaigns
- Remove duplicates
- Export valid numbers for records

❌ **DON'T**:
- Assume all numbers are valid
- Skip E.164 format validation
- Send to invalidated numbers

## 📚 Next Steps

### Learn More

- Read the [README.md](README.md) for detailed documentation
- Check [ENHANCED_FEATURES.md](ENHANCED_FEATURES.md) for feature details
- Review [PRD.md](PRD.md) for product requirements
- Visit [Twilio Docs](https://www.twilio.com/docs) for API info

### Customize

- Modify `server.js` to add custom endpoints
- Update `enhanced-campaign.html` for UI changes
- Add new validation rules as needed
- Extend with additional Twilio features

### Production Deployment

For production use, consider:
- Adding authentication layer
- Implementing rate limiting
- Using environment variables securely
- Setting up monitoring
- Adding error logging
- Implementing retry logic

## 🆘 Getting Help

**Documentation**:
- README.md - Complete documentation
- ENHANCED_FEATURES.md - Feature guide
- In-app tooltips and help text

**Support Resources**:
- [Twilio Support](https://support.twilio.com/)
- [Twilio Docs](https://www.twilio.com/docs)
- [GitHub Issues](https://github.com/educacion-global-Inc/twilio-verify-E164/issues)

**Community**:
- [Twilio Community](https://www.twilio.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/twilio)

## ✅ Checklist

Before your first campaign:

- [ ] Node.js and npm installed
- [ ] Dependencies installed (`npm install`)
- [ ] Server started (`npm start`)
- [ ] Browser opened to localhost:3000
- [ ] Twilio account created
- [ ] Twilio credentials obtained
- [ ] Credentials configured in app
- [ ] Test phone numbers prepared
- [ ] Test message written
- [ ] Small test campaign sent successfully
- [ ] Results verified in Twilio Console

## 🎉 You're Ready!

You now have everything you need to validate phone numbers and send campaigns with Twilio. Start with small tests and scale up as you get comfortable with the tool.

Happy campaigning! 🚀📱

---

**Need help?** Open an issue on GitHub or consult the Twilio documentation.
