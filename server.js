const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/proxy', async (req, res) => {
  try {
    const { url, method = 'GET', headers = {}, params = {}, data } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: url'
      });
    }

    const requestMethod = method.toUpperCase();
    const axiosConfig = {
      method: requestMethod,
      url,
      headers: {
        ...headers,
        'User-Agent': headers['User-Agent'] || 'Mock-API-Proxy-Server/1.0'
      },
      params,
      timeout: Number(process.env.PROXY_TIMEOUT) || 60000
    };

    if (data && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(requestMethod)) {
      axiosConfig.data = data;
    }

    const response = await axios(axiosConfig);

    return res.status(response.status).json({
      success: true,
      statusCode: response.status,
      data: response.data,
      headers: response.headers
    });
  } catch (error) {
    console.error('Proxy request failed:', error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: 'External API returned an error',
        statusCode: error.response.status,
        error: error.response.data,
        headers: error.response.headers
      });
    }

    if (error.request) {
      return res.status(504).json({
        success: false,
        message: 'No response received from external API',
        error: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error setting up the proxy request',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Proxy server running on http://${HOST}:${PORT}`);
});
