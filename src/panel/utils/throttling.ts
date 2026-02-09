interface ThrottlingCondition {
  offline: boolean
  latency: number // 延迟
  downloadThroughput: number // 下载速度
  uploadThroughput: number // 上传速度
  [key: string]: any
}

export const NETWORK_PRESETS: Record<string, ThrottlingCondition> = {
  'High-4G': {
    offline: false,
    latency: 150,
    downloadThroughput: 1.6 * 1024 * 1024 / 8,
    uploadThroughput: 750 * 1024 / 8,
  },
  'Low-4G': {
    offline: false,
    latency: 500,
    downloadThroughput: 500 * 1024 / 8,
    uploadThroughput: 50 * 1024 / 8,
  },
  '3G': {
    offline: false,
    latency: 1000,
    downloadThroughput: 100 * 1024 / 8,
    uploadThroughput: 50 * 1024 / 8,
  },
  'OFFLINE': {
    offline: true,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0,
  },
};

export async function setNetworkThrottling(key: string | null) {
  const tabId = chrome.devtools.inspectedWindow.tabId;
  const target = { tabId };

  try {
    if (key === null) return chrome.debugger.detach(target);
    const preset: ThrottlingCondition = NETWORK_PRESETS[key]!;
    await new Promise<void>((resolve) => {
      chrome.debugger.attach(target, '1.3', resolve);
    });
    await new Promise<void>((resolve, reject) => {
      chrome.debugger.sendCommand(target, 'Network.emulateNetworkConditions', preset, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
        else {
          resolve();
        }
      });
    });
  }
  catch (err) {
    console.error('ERROR:', err);
  }
}
