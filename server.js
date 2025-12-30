const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Twilio Lookup API - Verify phone number
app.post('/api/verify-phone', async (req, res) => {
    try {
        const { phoneNumber, accountSid, authToken } = req.body;

        if (!phoneNumber || !accountSid || !authToken) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                success: false 
            });
        }

        // Twilio Lookup API v2
        const url = `https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(phoneNumber)}`;
        
        const response = await axios.get(url, {
            auth: {
                username: accountSid,
                password: authToken
            },
            params: {
                Fields: 'line_type_intelligence'
            }
        });

        res.json({
            success: true,
            data: {
                phoneNumber: response.data.phone_number,
                valid: response.data.valid,
                countryCode: response.data.country_code,
                nationalFormat: response.data.national_format,
                lineType: response.data.line_type_intelligence?.type || 'unknown',
                carrier: response.data.line_type_intelligence?.carrier_name || 'unknown'
            }
        });
    } catch (error) {
        console.error('Verify phone error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data?.message || error.message,
            details: error.response?.data
        });
    }
});

// Send WhatsApp message
app.post('/api/send-whatsapp', async (req, res) => {
    try {
        const { to, from, message, accountSid, authToken, campaignId } = req.body;

        if (!to || !from || !message || !accountSid || !authToken) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                success: false 
            });
        }

        // Add campaign ID to message if provided
        const finalMessage = campaignId 
            ? `[Campaign: ${campaignId}]\n\n${message}` 
            : message;

        const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        
        const params = new URLSearchParams({
            To: `whatsapp:${to}`,
            From: `whatsapp:${from}`,
            Body: finalMessage
        });

        const response = await axios.post(url, params, {
            auth: {
                username: accountSid,
                password: authToken
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.json({
            success: true,
            data: {
                sid: response.data.sid,
                status: response.data.status,
                to: response.data.to,
                from: response.data.from,
                dateCreated: response.data.date_created
            }
        });
    } catch (error) {
        console.error('Send WhatsApp error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data?.message || error.message,
            details: error.response?.data
        });
    }
});

// Send SMS message
app.post('/api/send-sms', async (req, res) => {
    try {
        const { to, from, message, accountSid, authToken, campaignId } = req.body;

        if (!to || !from || !message || !accountSid || !authToken) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                success: false 
            });
        }

        // Add campaign ID to message if provided
        const finalMessage = campaignId 
            ? `[Campaign: ${campaignId}]\n\n${message}` 
            : message;

        const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        
        const params = new URLSearchParams({
            To: to,
            From: from,
            Body: finalMessage
        });

        const response = await axios.post(url, params, {
            auth: {
                username: accountSid,
                password: authToken
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.json({
            success: true,
            data: {
                sid: response.data.sid,
                status: response.data.status,
                to: response.data.to,
                from: response.data.from,
                dateCreated: response.data.date_created
            }
        });
    } catch (error) {
        console.error('Send SMS error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data?.message || error.message,
            details: error.response?.data
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/campaign', (req, res) => {
    res.sendFile(path.join(__dirname, 'campaign.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} to use the validator`);
});
