// pages/api/markdown.js

import fs from 'fs'; // Node.js file system module

export default function handler(req, res) {
  const markdownContent = fs.readFileSync('public/home.md', 'utf-8');
  res.status(200).json({ content: markdownContent })
}
