chrome.runtime.onInstalled.addListener(() => {
  chrome.management.getAll(extensions => {
    extensions.forEach(extension => {
      chrome.storage.local.set({ [extension.id]: extension.enabled });
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "toggle") {
    const { extensionId, enabled } = message;
    chrome.management.setEnabled(extensionId, enabled, () => {
      chrome.storage.local.set({ [extensionId]: enabled });
      sendResponse({ success: true });
    });
  }
});
