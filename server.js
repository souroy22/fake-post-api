require("dotenv").config();
const express = require("express");
const cors = require("cors");
const staticPosts = require("./data");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("<h1>Successfully deployed!</h1>");
});

app.get("/posts", (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = staticPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(staticPosts.length / limit);
    return res.status(200).json({
      page,
      limit,
      totalItems: staticPosts.length,
      totalPages,
      data: paginatedPosts,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Server is down. Please try again" });
  }
});

app.get("/posts/:id", (req, res) => {
  try {
    const { id } = req.params;
    const post = staticPosts.find((data) => data.id === parseInt(id));
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Server is down. Please try again" });
  }
});

app.listen(8000, (error) => {
  if (error) {
    console.error(error.message);
    return;
  }
  console.log(`Server is listening to PORT: ${PORT}`);
});
