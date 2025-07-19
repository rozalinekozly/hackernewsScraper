// app.js
fetch("/api/scrape")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("news-list");
    data.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title;
      a.target = "_blank";
      li.appendChild(a);
      list.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Failed to load news:", err);
  });
