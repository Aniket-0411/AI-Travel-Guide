# AI Travel Guide

A Comprehensive AI travel Guide Website.

## Setup Instruction

### Root directory
- We need two terminal windows, and all terminal window should go to the root folder.
#### Mac
```
cd [your-directory-path]/CMPE280-Project
```
#### Windows
```
cd [your-directory-path]\CMPE280-Project
```

### Frontend terminal
- Move to the frontend folder
```
cd cmpe280-project 
```
- Install all required package
```
npm install
```

### Backend terminal
- Move to the backend folder
```
cd backend
```
- Install all required package
```
npm install
```

## Other Instruction
In order to run the backend, you need to have a ".env" file under the "backend" folder
### Backend terminal
```
touch .env
```
#### .env file modification
Copy and modify the follow text to the .env file either using VSCode or local file editor
```
CHATGPT_API_KEY=<Your-OpenAI-API-Key>
PORT=3001
EMAIL_USER=noreply.aitravelguide@gmail.com
EMAIL_PASSWORD=lmvntqwswhotacnd
```

## Run
### Frontend terminal
```
npm start
```

### Backend terminal
```
npm start
```
