chrome.runtime.onInstalled.addListener(function (details) {
  /* コンテキストメニューを作成 */
  const parent = chrome.contextMenus.create({
    id: "share",
    title: "Sonionx",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    parentId: parent,
    id: "readItOutLoudEn",
    title: "Read it out loud (English)",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "readItOutLoudJp",
    title: "日本語で読み上げ",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "title",
    title: "ページタイトルをコピー",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "URL",
    title: "URL をコピー",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "both",
    title: "ページタイトルと URL をコピー",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "FB",
    title: "Facebook でシェア",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "tweet",
    title: "ツイート",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "LINE",
    title: "LINE で送る",
    contexts: ["all"],
  });
});

/* コンテキストメニューがクリックされた時の処理 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "readItOutLoudJp":
      // chrome.tts.speak(info.selectionText, { 'lang': 'en-US', 'rate': 1.0 });
      chrome.tts.speak(info.selectionText, { 'lang': 'ja-JP', 'rate': 1.0 });
      break;
    case "readItOutLoudEn":
      chrome.tts.speak(info.selectionText, { 'lang': 'en-US', 'rate': 1.0 });
      break;
    case "title":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: title,
      });
      break;

    case "URL":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: URL,
      });
      break;

    case "both":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: both,
      });
      break;

    case "FB":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: FB,
      });
      break;

    case "tweet":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: tweet,
      });
      break;

    case "LINE":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: LINE,
      });
      break;
  }
});
function title() {
  const element = document.createElement("textarea");
  element.value = document.title;
  document.body.append(element);
  element.select();
  document.execCommand("copy");
  element.remove();
}

function URL() {
  const element = document.createElement("textarea");
  element.value = location.href;
  document.body.append(element);
  element.select();
  document.execCommand("copy");
  element.remove();
}

function both() {
  const element = document.createElement("textarea");
  element.value = document.title + "\n" + location.href;
  document.body.append(element);
  element.select();
  document.execCommand("copy");
  element.remove();
}

function FB() {
  window.open(
    "https://www.facebook.com/share.php?u=" + encodeURIComponent(location.href),
    "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1"
  );
}
function tweet() {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(document.title) +
    "%0a&url=" +
    encodeURIComponent(location.href),
    "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1"
  );
}
function LINE() {
  window.open(
    "https://social-plugins.line.me/lineit/share?url=" +
    encodeURIComponent(location.href),
    "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1"
  );
}
