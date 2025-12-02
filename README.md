# Modern Full-Stack Website

A beautiful, responsive website with a React frontend and Node.js/Express backend API.

## 🚀 Features

### Frontend
- ✨ Modern, premium design with vibrant gradients and animations
- 🎨 Glassmorphism effects and smooth transitions
- 📱 Fully responsive design
- ⚡ Built with React and Vite for optimal performance
- 🎭 Hero section with animated content
- 💼 Services section with interactive cards
- 📧 Contact form with backend integration

### Backend
- 🔥 RESTful API built with Express.js
- 🗄️ MongoDB integration for data persistence
- 🔐 Environment variable configuration
- ✅ Input validation and error handling
- 🌐 CORS enabled for frontend communication

## 📋 API Endpoints

### GET /api/team
Returns team member data.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Alex Johnson",
      "role": "Full Stack Developer",
      "bio": "Passionate about building scalable web applications...",
      "avatar": "👨‍💻"
    }
  ]
}
```

### POST /api/contact
Submit contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-12-02T08:40:59.000Z"
  }
}
```

### GET /api/health
Health check endpoint to verify server status.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Optionally change the `PORT` (default: 5000)

4. Start the server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

## 🗄️ Database Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/modern-website`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `server/.env`

**Note:** The server will run without a database connection, but contact form submissions won't be persisted.

## 🎨 Technology Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with custom properties
- **Google Fonts** - Inter font family

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
PROMPTTT/
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Component styles
│   ├── index.css        # Design system & global styles
│   └── main.jsx         # React entry point
├── server/
│   ├── server.js        # Express server
│   ├── .env             # Environment variables
│   └── package.json     # Backend dependencies
├── public/              # Static assets
├── index.html           # HTML entry point
└── package.json         # Frontend dependencies
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the production bundle:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

### Backend (Render/Railway/Heroku)
1. Push your code to GitHub
2. Connect your repository to your hosting service
3. Set environment variables in the hosting dashboard
4. Deploy!

## 📝 License

ISC

## 👨‍💻 Author

Built with ❤️ using modern web technologies
