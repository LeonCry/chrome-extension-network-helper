interface Detail {
  row: TableColumn
  content: any
}

interface JSONDetail extends Detail { content: Record<string, any> }

export type { Detail, JSONDetail };
