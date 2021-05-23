export interface PaginationProps {
  pageIndex?: number
  pageSize?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

class Pagination {
  public readonly state: PaginationProps
  constructor(props: PaginationProps = { pageIndex: 1, pageSize: 10, totalPages: 0 }) {
    this.state = props
  }

  public render(): HTMLDivElement {
    const div = document.createElement('div')
    div.innerText = this.state.totalPages?.toString() || '0'
    div.addEventListener('click', this.handleClick)
    return div
  }

  private handleClick(ev: MouseEvent) {
    const el = ev.target as HTMLDivElement
    this.state.pageIndex = Number(el.innerText)
    this.state.onPageChange?.(this.state.pageIndex || 1)
  }
}

export default Pagination
