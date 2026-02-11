interface ChromeRequest extends chrome.devtools.network.Request {
  _miniUrl: string
  _resourceType: string
  _size: string
  _time: string
  _loading?: boolean
  response: chrome.devtools.network.Request.response & { status: string | number }
}
