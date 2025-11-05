const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// GitHub Users API endpoint
const GITHUB_API = 'https://api.github.com/users';
// Alternative: JSONPlaceholder API
const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/users';

// Route: Home
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mock API Server',
    endpoints: {
      'GET /api/users/github': 'Get GitHub users list',
      'GET /api/users/github/:username': 'Get specific GitHub user',
      'GET /api/users/mock': 'Get users from JSONPlaceholder'
    }
  });
});

// Route: Get GitHub users list
app.get('/api/users/github', async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const response = await axios.get(`${GITHUB_API}?per_page=${limit}`);
    
    const users = response.data.map(user => ({
      id: user.id,
      username: user.login,
      avatar: user.avatar_url,
      profile: user.html_url,
      type: user.type
    }));

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching GitHub users:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch GitHub users',
      error: error.message
    });
  }
});

// Route: Get specific GitHub user by username
app.get('/api/users/github/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${GITHUB_API}/${username}`);
    
    const user = {
      id: response.data.id,
      username: response.data.login,
      name: response.data.name,
      avatar: response.data.avatar_url,
      profile: response.data.html_url,
      bio: response.data.bio,
      location: response.data.location,
      email: response.data.email,
      public_repos: response.data.public_repos,
      followers: response.data.followers,
      following: response.data.following,
      created_at: response.data.created_at
    };

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching GitHub user:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Failed to fetch GitHub user',
      error: error.message
    });
  }
});

// Route: Get users from JSONPlaceholder (alternative mock API)
app.get('/api/users/mock', async (req, res) => {
  try {
    const response = await axios.get(JSONPLACEHOLDER_API);
    
    res.json({
      success: true,
      count: response.data.length,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching mock users:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mock users',
      error: error.message
    });
  }
});

// Route: Get user repositories from GitHub
app.get('/api/users/github/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    const limit = req.query.limit || 10;
    const response = await axios.get(`${GITHUB_API}/${username}/repos?per_page=${limit}`);
    
    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at
    }));

    res.json({
      success: true,
      count: repos.length,
      data: repos
    });
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Failed to fetch repositories',
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Try these endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/users/github`);
  console.log(`   - http://localhost:${PORT}/api/users/github/octocat`);
  console.log(`   - http://localhost:${PORT}/api/users/mock`);
});

