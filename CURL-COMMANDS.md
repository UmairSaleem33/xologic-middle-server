# CMD Curl Commands for Testing

Server pehle start karo ek alag CMD window mein:
```cmd
cd mock-api-server
node server.js
```

---

## 🧪 Individual Curl Commands (Copy & Paste karo CMD mein)

### 1. Home Endpoint Test
```cmd
curl http://localhost:3000/
```

### 2. GitHub Users List (5 users)
```cmd
curl http://localhost:3000/api/users/github?limit=5
```

### 3. GitHub Users List (10 users)
```cmd
curl http://localhost:3000/api/users/github?limit=10
```

### 4. Specific GitHub User (octocat)
```cmd
curl http://localhost:3000/api/users/github/octocat
```

### 5. Specific GitHub User (torvalds - Linux creator)
```cmd
curl http://localhost:3000/api/users/github/torvalds
```

### 6. Specific GitHub User (your choice)
```cmd
curl http://localhost:3000/api/users/github/jahzaib
```

### 7. User Repositories (octocat)
```cmd
curl http://localhost:3000/api/users/github/octocat/repos?limit=5
```

### 8. Mock Users (JSONPlaceholder)
```cmd
curl http://localhost:3000/api/users/mock
```

---

## 📊 Pretty JSON Output (Formatted)

Windows mein Python agar installed hai to:
```cmd
curl http://localhost:3000/api/users/github?limit=5 | python -m json.tool
```

Ya Node.js use karo formatting ke liye:
```cmd
curl http://localhost:3000/api/users/github?limit=5 | node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync(0)), null, 2))"
```

---

## 💾 Output ko File mein Save karo

```cmd
curl http://localhost:3000/api/users/github?limit=5 > github-users.json
```

```cmd
curl http://localhost:3000/api/users/mock > mock-users.json
```

---

## 🔍 Detailed Output (Headers bhi dekho)

```cmd
curl -i http://localhost:3000/api/users/github?limit=5
```

```cmd
curl -v http://localhost:3000/api/users/github/octocat
```

---

## 🎯 POST Request Test (if needed)

Agar future mein POST endpoint banao to:
```cmd
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"name\":\"Test User\"}"
```

---

## 🔄 Automated Testing (Batch Script)

Sab endpoints ko ek saath test karo:
```cmd
test-curl.bat
```

---

## 🌐 Browser mein Test karo

Ye URLs directly browser mein khol sakte ho:
- http://localhost:3000/
- http://localhost:3000/api/users/github?limit=5
- http://localhost:3000/api/users/github/octocat
- http://localhost:3000/api/users/github/octocat/repos
- http://localhost:3000/api/users/mock

---

## 🚀 Quick Start Guide

### Step 1: Pehla CMD Window (Server)
```cmd
cd mock-api-server
node server.js
```
Server start hone ka wait karo (2-3 seconds)

### Step 2: Dusra CMD Window (Testing)
```cmd
cd mock-api-server
curl http://localhost:3000/api/users/github?limit=5
```

---

## 📝 Response Examples

### Home Endpoint Response:
```json
{
  "message": "Welcome to Mock API Server",
  "endpoints": {
    "GET /api/users/github": "Get GitHub users list",
    "GET /api/users/github/:username": "Get specific GitHub user",
    "GET /api/users/mock": "Get users from JSONPlaceholder"
  }
}
```

### GitHub Users Response:
```json
{
  "success": true,
  "count": 5,
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

---

## 🐛 Troubleshooting

### Server nahi chal raha?
```cmd
REM Check if port 3000 is in use
netstat -ano | findstr :3000

REM Kill process if needed
taskkill /PID <PID_NUMBER> /F
```

### Curl command not found?
Windows 10 (1803+) mein curl built-in hai. Agar nahi hai to:
- Git Bash use karo
- Ya PowerShell use karo

---

## 💡 Tips

1. **JSON ko readable banao** (agar jq installed ho):
```cmd
curl http://localhost:3000/api/users/github?limit=5 | jq .
```

2. **Silent mode** (progress bar hide karo):
```cmd
curl -s http://localhost:3000/api/users/github?limit=5
```

3. **Response time check**:
```cmd
curl -w "\nTime: %{time_total}s\n" http://localhost:3000/api/users/github?limit=5
```

4. **Follow redirects**:
```cmd
curl -L http://localhost:3000/api/users/github?limit=5
```

---

## 🎨 Color Output (Git Bash mein)

Agar Git Bash use kar rahe ho:
```bash
curl http://localhost:3000/api/users/github?limit=5 | python -m json.tool
```

---

## ⚡ Quick Test Commands

Sabse simple test:
```cmd
curl localhost:3000
```

Users list:
```cmd
curl localhost:3000/api/users/github?limit=3
```

Specific user:
```cmd
curl localhost:3000/api/users/github/octocat
```

