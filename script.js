function plural(n, word) {
  return `${n} ${word}${n === 1 ? "" : "s"} ago`;
}

function timeAgo(dateString) {
  const then = new Date(dateString);
  const now = new Date();
  then.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const days = Math.round((now - then) / 86400000);

  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return plural(days, "day");
  if (days < 30) return plural(Math.floor(days / 7), "week");
  if (days < 365) return plural(Math.floor(days / 30), "month");
  return plural(Math.floor(days / 365), "year");
}

const cards = document.querySelectorAll("[data-repo]");

cards.forEach(async (card) => {
  const stirred = card.querySelector(".stirred");

  try {
    const response = await fetch(`https://api.github.com/repos/${card.dataset.repo}`);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    stirred.textContent = `// last stirred: ${timeAgo(data.pushed_at)}`;
  } catch {
    stirred.textContent = "// last stirred: notes misplaced";
  }
});