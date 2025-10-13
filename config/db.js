const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connectionString = "mongodb+srv://abilzuhrotins_db_user:Abil155@projek.dlbeain.mongodb.net/?retryWrites=true&w=majority&appName=Projek";
    await mongoose.connect(connectionString);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDb;