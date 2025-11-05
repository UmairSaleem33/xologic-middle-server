# Mock API Server

Yeh ek simple Node.js Express server hai jo mock APIs se users ki list fetch karta hai using Axios.

## Features

- ✅ Express.js server
- ✅ Axios for API requests
- ✅ GitHub Users API integration
- ✅ JSONPlaceholder API integration
- ✅ CORS enabled
- ✅ Error handling

## Installation

```bash
cd mock-api-server
npm install
```

## Run Server

```bash
# Normal mode
npm start

# Development mode (with auto-reload)
npm run dev
```

Server `http://localhost:3000` par chal jayega.

## API Endpoints

### 1. Home
```
GET http://localhost:3000/
```
Available endpoints ki list dikhata hai.

### 2. GitHub Users List
```
GET http://localhost:3000/api/users/github
GET http://localhost:3000/api/users/github?limit=20
```
GitHub se users ki list fetch karta hai. Default: 10 users

### 3. Specific GitHub User
```
GET http://localhost:3000/api/users/github/octocat
```
Kisi specific GitHub user ki details fetch karta hai.

### 4. User Repositories
```
GET http://localhost:3000/api/users/github/octocat/repos
GET http://localhost:3000/api/users/github/octocat/repos?limit=5
```
User ki repositories fetch karta hai.

### 5. Mock Users (JSONPlaceholder)
```
GET http://localhost:3000/api/users/mock
```
JSONPlaceholder se mock users fetch karta hai.

## Example Response

**GitHub Users:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "username": "mojombo",
      "avatar": "https://avatars.githubusercontent.com/u/1?v=4",
      "profile": "https://github.com/mojombo",
      "type": "User"
    }
  ]
}
```

## Technologies

- Node.js
- Express.js
- Axios
- CORS

## Notes

- GitHub API ki rate limit hai: 60 requests/hour (unauthenticated)
- Token use karne ke liye: `Authorization: token YOUR_GITHUB_TOKEN`

