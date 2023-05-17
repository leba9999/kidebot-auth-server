import mongoose from "mongoose";

const mongoConnect = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL as string);
  return connection;
};

export default mongoConnect;
