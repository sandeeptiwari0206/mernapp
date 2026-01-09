import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb+srv://sandeeptiwari_db_user:vHxJba4SRSaC4tIV@cluster0.cbb1rgz.mongodb.net/?appName=Cluster0);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
