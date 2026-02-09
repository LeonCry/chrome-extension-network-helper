const CACHE_RULE_ID = 1;

/**
 * 开启禁用缓存
 */
export async function enableDisableCache() {
  const tabId = chrome.devtools.inspectedWindow.tabId;
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [CACHE_RULE_ID],
    addRules: [
      {
        id: CACHE_RULE_ID,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: [
            { header: 'Cache-Control', operation: chrome.declarativeNetRequest.HeaderOperation.SET, value: 'no-cache, no-store, must-revalidate' },
            { header: 'Pragma', operation: chrome.declarativeNetRequest.HeaderOperation.SET, value: 'no-cache' },
            { header: 'Expires', operation: chrome.declarativeNetRequest.HeaderOperation.SET, value: '0' },
          ],
        },
        condition: {
          tabIds: [tabId],
          resourceTypes: [
            chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
            chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
            chrome.declarativeNetRequest.ResourceType.STYLESHEET,
            chrome.declarativeNetRequest.ResourceType.SCRIPT,
            chrome.declarativeNetRequest.ResourceType.IMAGE,
            chrome.declarativeNetRequest.ResourceType.FONT,
            chrome.declarativeNetRequest.ResourceType.OBJECT,
            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
            chrome.declarativeNetRequest.ResourceType.PING,
            chrome.declarativeNetRequest.ResourceType.CSP_REPORT,
            chrome.declarativeNetRequest.ResourceType.MEDIA,
            chrome.declarativeNetRequest.ResourceType.WEBSOCKET,
            chrome.declarativeNetRequest.ResourceType.OTHER,
          ],
        },
      },
    ],
  });
}

/**
 * 关闭禁用缓存
 */
export async function disableDisableCache() {
  await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: [CACHE_RULE_ID] });
}
