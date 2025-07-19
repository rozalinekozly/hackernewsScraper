// api/scrape.js
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  try {
    const response = await fetch("https://news.ycombinator.com/");
    const html = await response.text();
    const $ = cheerio.load(html);

    const results = [];

    $(".athing").each((_, el) => {
      const title = $(el).find(".titleline > a").text();
      const url = $(el).find(".titleline > a").attr("href");
      results.push({ title, url });
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(results);
  } catch (err) {
    console.error("Scraping error:", err);
    res.status(500).json({ error: "Scraping failed" });
  }
};
