const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

//environment variable or you can say constants
env.config();

// mongodb connection
//mongodb+srv://root:<password>@cluster0.8pl1w.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.hmsue.mongodb.net:27017,cluster0-shard-00-01.hmsue.mongodb.net:27017,cluster0-shard-00-02.hmsue.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-12s2zk-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  }).catch((err) => {
    console.log(err)
  });

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);

const PORT = process.env.PORT;


// heroku deploy

// if (process.env.NODE-ENV == "production") {
//   app.use(express.static("client/build"))
// }

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

