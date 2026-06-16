import mongoose from "mongoose";
const connectDB = async() => {
        try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27018/mydb");

        console.log(`connection database success: `)
    } catch (error) {
        console.error("error connection database:", error.message);
        process.exit(1);
    }
}


export default connectDB;