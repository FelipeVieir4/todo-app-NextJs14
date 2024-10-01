import mongoose from "mongoose"

export const ConnectDB = async () => {
    console.log("Initializing database connection...");
    const db_connection = `mongodb+srv://todo-app:fm5pYa6!3g2bRtL@cluster0.ffxbt.mongodb.net/todo-app`
    console.log("Database Connected")
    await mongoose.connect(db_connection)

}


