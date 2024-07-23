import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 8000;
const API_URL = "http://localhost:7000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      console.log(response.data)
      res.render("index.ejs", { posts: response.data });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
  });

  app.get("/new", (req, res) => {
    res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
  });

  app.get("/edit/:id", async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
      console.log(response.data);
      res.render("modify.ejs", {
        heading: "Edit Post",
        submit: "Update Post",
        post: response.data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching post" });
    }
  });
  
  app.post("/api/posts", async (req, res) => {
    try {
      const response = await axios.post(`${API_URL}/posts`, req.body);
      console.log(response.data);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error creating post" });
    }
  });

  app.post("/api/posts/:id", async (req, res) => {
    console.log("called");
    try {
      const response = await axios.patch(
        `${API_URL}/posts/${req.params.id}`,
        req.body
      );
      console.log(response.data);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error updating post" });
    }
  });

  app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });
  