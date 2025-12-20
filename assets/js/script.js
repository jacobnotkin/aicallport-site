// Small helper: dynamic year
document.getElementById("year")?.appendChild(
  document.createTextNode(String(new Date().getFullYear()))
);
