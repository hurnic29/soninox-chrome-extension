const title = document.getElementById("pageTitle");
const url = document.getElementById("pageURL");

/*========================= ここは削除！

title.value = document.title;// タイトルを代入
url.value = location.href;  //URLを代入

===========================*/


/*ココから追記分*/
chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, tabs => {
    // title.value = tabs[0].title;
    // url.value = tabs[0].url;
    const tabTitle = tabs[0].title;
    const tabUrl = tabs[0].url;

    document.getElementById("copyTitle").addEventListener("click", () => {
        navigator.clipboard.writeText(tabTitle);
        showCheck("copyTitle");
    }, false);
    document.getElementById("copyURL").addEventListener("click", () => {
        navigator.clipboard.writeText(tabUrl);
        showCheck("copyURL");
    }, false);
    document.getElementById("copyBoth").addEventListener("click", () => {
        navigator.clipboard.writeText(tabTitle + "\n" + tabUrl);
        showCheck("copyBoth");
    }, false);

    /*Facebook*/
    document.getElementById("shareToFB").addEventListener("click", () => {
        windowOpen("https://www.facebook.com/share.php?u=" + encodeURIComponent(tabUrl));
    }, false);

    /*Twitter*/
    document.getElementById("tweet").addEventListener("click", () => {
        windowOpen("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tabTitle) + "%0a&url=" + encodeURIComponent(tabUrl));
    }, false);

    /*LINE*/
    document.getElementById("LINE").addEventListener("click", () => {
        windowOpen("https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(tabUrl));
    }, false);

    if (!/http\:\/\/|https\:\/\//.test(tabUrl)) {
        const element = document.getElementById("sns");
        element.style.marginTop = "1.5em";
        element.textContent = "このページでは SNS を用いたシェア機能をご利用になれません。ご了承ください。";
    }

});

let timeout;
/**
 * Shows a check icon and hides a clipboard icon for a specified parent element.
 * The function also sets a timeout to hide the check icon and show the clipboard icon after 5 seconds.
 *
 * @param {string} parentId - The ID of the parent element.
 * @return {void} This function does not return anything.
 */
function showCheck(parentId) {
    clearTimeout(timeout); //5秒後に予定されている処理をキャンセル
    const checkIcons = document.getElementsByClassName("checkIcon");
    for (let i = 0; i < checkIcons.length; i++) {
        checkIcons[i].style.display = "none"; //一旦すべてのチェックアイコンを非表示に
    }
    const clipIcons = document.getElementsByClassName("bi-clipboard");
    for (let i = 0; i < clipIcons.length; i++) {
        clipIcons[i].style.display = ""; //一旦すべてのクリップボードアイコンを表示
    }
    const child = document.getElementById(parentId).children; //ボタンの子要素を取得
    child[0].style.display = "none"; //ボタンの子要素のうち1番目、つまりクリップボードアイコンを非表示に
    child[1].style.display = ""; //ボタンの子要素のうち2番目、つまりチェックアイコンを表示する

    timeout = setTimeout(() => {
        /*5秒後の処理*/
        child[0].style.display = ""; //クリップボードアイコンを表示する
        child[1].style.display = "none"; //チェックアイコンを非表示に
    }, 5000);
}

/**
 * Opens a new window with the specified URL and properties.
 *
 * @param {string} url - The URL to open in the new window.
 * @return {boolean} Returns false to prevent the default behavior of the event.
 */
function windowOpen(url) {
    window.open(url, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1')
    this.close();
    return false;
}

