const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PUBLIC_IP_ENDPOINT = process.env.PUBLIC_IP_ENDPOINT || 'https://api.ipify.org?format=json';
const PUBLIC_IP_CACHE_TTL = Number(process.env.PUBLIC_IP_CACHE_TTL) || 5 * 60 * 1000;

let cachedPublicIp = null;
let cachedPublicIpFetchedAt = 0;

async function getPublicIp() {
  const now = Date.now();

  if (cachedPublicIp && now - cachedPublicIpFetchedAt < PUBLIC_IP_CACHE_TTL) {
    return cachedPublicIp;
  }

  try {
    const response = await axios.get(PUBLIC_IP_ENDPOINT, {
      timeout: Number(process.env.PUBLIC_IP_TIMEOUT) || 5000
    });

    if (response?.data?.ip) {
      cachedPublicIp = response.data.ip;
      cachedPublicIpFetchedAt = now;
      return cachedPublicIp;
    }

    if (typeof response.data === 'string' && response.data.trim()) {
      cachedPublicIp = response.data.trim();
      cachedPublicIpFetchedAt = now;
      return cachedPublicIp;
    }
  } catch (ipError) {
    console.warn('Failed to fetch public IP:', ipError.message);
  }

  return null;
}

app.post('/api/proxy', async (req, res) => {
  let publicIp = null;
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

    publicIp = await getPublicIp();
    const response = await axios(axiosConfig);
    const outboundIp = response?.request?.socket?.localAddress || null;
    console.log('Proxy request succeeded. Outbound IP:', outboundIp);

    return res.status(response.status).json({
      success: true,
      statusCode: response.status,
      data: response.data,
      headers: response.headers,
      outboundIp,
      publicIp
    });
  } catch (error) {
    const errorOutboundIp =
      error?.response?.request?.socket?.localAddress ||
      error?.request?.socket?.localAddress ||
      null;
    if (!publicIp) {
      publicIp = await getPublicIp();
    }
    console.error('Proxy request failed:', error.message, ' publicIp:', publicIp);

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: 'External API returned an error',
        statusCode: error.response.status,
        error: error.response.data,
        headers: error.response.headers,
        publicIp
      });
    }

    if (error.request) {
      return res.status(504).json({
        success: false,
        message: 'No response received from external API',
        error: error.message,
        outboundIp: errorOutboundIp,
        publicIp
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error setting up the proxy request',
      error: error.message,
      outboundIp: errorOutboundIp,
      publicIp
    });
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Proxy server running on http://${HOST}:${PORT}`);
});
