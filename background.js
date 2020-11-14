const orderingParam = encodeURI('sorting_setting=CHRONOLOGICAL');
const fbGroupsCondition = {
  url: [{hostSuffix: "facebook.com", pathContains: "groups"}]
};

// https://developer.chrome.com/extensions/webNavigation#event-onCommitted
chrome.webNavigation.onCommitted.addListener(addSortingParam, fbGroupsCondition);
// https://stackoverflow.com/questions/27239280/chrome-webnavigation-oncomplete-not-working
chrome.webNavigation.onHistoryStateUpdated.addListener(addSortingParam, fbGroupsCondition);

function addSortingParam(tab) {
  const url = tab.url;

  // Don't add the param again if it's already there
  if (url.indexOf(orderingParam) != -1) return;

  const hashStart = (url.indexOf('#') === -1) ? url.length : url.indexOf('#');
  const querySymbol = (url.indexOf('?') === -1) ? '?' : '&';
  const newUrl = url.substring(0, hashStart) + querySymbol + orderingParam +
                 url.substring(hashStart);

  chrome.tabs.update(tab.id, {url: newUrl});
}

