export interface TableColumn {
  _requestId: string
  _loading: boolean
  _error: boolean
  miniUrl: string
  url: string
  status: number | 'PENDING' | 'ERROR'
  type: string | null | undefined
  method: string
  size: string
  time: string
  getContent: (callback: (content: string) => void) => void
}

export const baseColumn: TableColumn = {
  _requestId: '',
  _loading: true,
  _error: false,
  miniUrl: '',
  url: '',
  status: 'PENDING',
  type: '',
  method: '',
  size: '/',
  time: '/',
  getContent: () => {},
};
