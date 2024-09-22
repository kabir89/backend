const express = require("express");
const { errors } = require("celebrate");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

// Celebrate validation error middleware should be before custom error handler
app.use(errors()); // <-- This should be here
app.use(errorHandler); // <-- Then your custom error handler

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
