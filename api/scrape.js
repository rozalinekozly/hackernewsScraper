// api/scrape.js
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  try {
    const response = await fetch("https://news.ycombinator.com/");
    const html = await response.text();
    const $ = cheerio.load(html);

    const results = [];

    $(".athing").each((_, element) => {
      const title = $(element).find(".titleline > a").text();
      const url = $(element).find(".titleline > a").attr("href");
      results.push({ title, url });
    });

    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow fetch from frontend
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to scrape" });
  }
};
