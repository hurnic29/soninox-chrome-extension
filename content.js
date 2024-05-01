const article = document.querySelector("article");

// var style = document.createElement('style');
// style.type = 'text/css';
// style.innerHTML = '.cssClass { color: brown; background-color: cadetblue; }';

if (article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    badge.style.color = "brown";
    badge.style.backgroundColor = "cadetblue";
    // badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `提醒你，阅读此文章预计需要 ${readingTime} 分钟`;
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    (date ?? heading).insertAdjacentElement("afterend", badge);
}