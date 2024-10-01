import mongoose from "mongoose"

export const ConnectDB = async () => {
    console.log("Initializing database connection...");
    const db_connection = `mongodb+srv://todo-app:${process.env.DB_PASSWORD}@cluster0.ffxbt.mongodb.net/todo-app`
    console.log("Database Connected")
    await mongoose.connect(db_connection)

}


