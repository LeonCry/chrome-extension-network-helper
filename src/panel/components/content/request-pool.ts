interface ConnectStatus {
  requestId: string
  startTime: number
}
const baseConnectStatus: ConnectStatus = {
  requestId: '',
  startTime: 0,
};
export function createRequestPool() {
  const pool = new Map<string, ConnectStatus[]>();
  // 添加请求到池中
  function addPool(requestId: string, url: string, startTime: number) {
    const connectStatus = {
      ...baseConnectStatus,
      requestId,
      startTime,
    };
    const t = pool.get(url) || [];
    t.push(connectStatus);
    pool.set(url, t);
  }
  // 获取相同请求并修改数据
  function getRequestIdInPool(url: string, startedDateTime: string) {
    const receptor = pool.get(url) || [];
    // console.log(url, receptor);
    if (!receptor?.length) return;
    if (receptor.length === 1) {
      pool.delete(url);
      return receptor[0]!.requestId;
    }
    let minDiff = Infinity;
    let minDiffId = '';
    for (let i = 0; i < receptor.length; i++) {
      const connectStatus = receptor[i];
      if (!connectStatus) continue;
      const diff = Math.abs(new Date(startedDateTime).getTime() - connectStatus.startTime);
      minDiff = Math.min(minDiff, diff);
      if (diff === minDiff) minDiffId = connectStatus.requestId;
    }
    const remain = receptor.filter(item => item.requestId !== minDiffId);
    pool.set(url, remain);
    return minDiffId;
  }
  // 释放请求池
  function releasePool() {
    pool.clear();
  }
  return {
    addPool,
    getRequestIdInPool,
    releasePool,
  };
}
