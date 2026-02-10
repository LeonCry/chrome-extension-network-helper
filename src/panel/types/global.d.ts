interface ChromeRequest extends chrome.devtools.network.Request {
  _miniUrl: string
  _resourceType: string
}
