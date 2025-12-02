import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('Testing MongoDB connection...');
// Hide password in logs
const maskedURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 'UNDEFINED';
console.log('URI:', maskedURI);

if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is undefined in .env file');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        console.log('Connection State:', mongoose.connection.readyState);
        console.log('Host:', mongoose.connection.host);
        console.log('Database Name:', mongoose.connection.name);
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:');
        console.error(err.message);
        process.exit(1);
    });
