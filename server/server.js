import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✅ MongoDB connected successfully');
        } else {
            console.log('⚠️  No MongoDB URI found. Running without database.');
        }
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.log('⚠️  Server will run without database connection');
    }
};

connectDB();

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes

// GET /api/team - Returns team member data
app.get('/api/team', (req, res) => {
    const teamMembers = [
        {
            id: 1,
            name: 'Alex Johnson',
            role: 'Full Stack Developer',
            bio: 'Passionate about building scalable web applications with modern technologies.',
            avatar: '👨‍💻'
        },
        {
            id: 2,
            name: 'Sarah Chen',
            role: 'UI/UX Designer',
            bio: 'Creating beautiful and intuitive user experiences that delight users.',
            avatar: '👩‍🎨'
        },
        {
            id: 3,
            name: 'Michael Brown',
            role: 'Backend Engineer',
            bio: 'Specializing in API development and database optimization.',
            avatar: '👨‍💼'
        },
        {
            id: 4,
            name: 'Emily Davis',
            role: 'DevOps Engineer',
            bio: 'Ensuring smooth deployments and maintaining robust infrastructure.',
            avatar: '👩‍🔧'
        }
    ];

    res.json({
        success: true,
        data: teamMembers
    });
});

// POST /api/contact - Store contact form data
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Save to database if connected
        if (mongoose.connection.readyState === 1) {
            const contact = new Contact({
                name,
                email,
                message
            });

            await contact.save();

            res.status(201).json({
                success: true,
                message: 'Contact form submitted successfully',
                data: {
                    id: contact._id,
                    name: contact.name,
                    email: contact.email,
                    createdAt: contact.createdAt
                }
            });
        } else {
            // If no database connection, just return success
            console.log('📧 Contact form submission (no DB):', { name, email, message });
            res.status(201).json({
                success: true,
                message: 'Contact form received (database not connected)',
                data: { name, email }
            });
        }
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit contact form'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
