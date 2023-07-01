const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${Date.now()}${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static("public"));

// Endpoint for fetching approved memes
app.get("/api/memes", (req, res) => {
  // Replace this with your logic for fetching the approved memes from a database or file
  const approvedMemes = [
    {
      image: "path/to/meme1.jpg",
      caption: "Caption 1",
    },
    {
      image: "path/to/meme2.jpg",
      caption: "Caption 2",
    },
    {
      image: "path/to/meme3.jpg",
      caption: "Caption 3",
    },
    // Add more approved memes as needed
  ];

  res.json(approvedMemes);
});

// Endpoint for submitting a meme
app.post("/api/memes", upload.single("image"), (req, res) => {
  const caption = req.body.caption;
  const image = req.file;

  if (!caption || !image) {
    return res.status(400).json({ error: "Both meme image and caption are required." });
  }

  // Replace this with your logic for processing the meme, e.g., saving it in a database or sending it for approval
  const approved = true; // Set this to false if the meme needs to go through an approval process

  res.json({ approved });
});

// Serve the approver.html page
app.get("/approver", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "approver.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
