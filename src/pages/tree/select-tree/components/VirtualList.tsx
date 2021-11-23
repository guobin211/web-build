/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

export interface RowData<T = any> {
  index: number;
  data: T;
  isScrolling: boolean;
  isVisible: boolean;
}

export interface VirtualListProps {
  // 列表数据
  data: any[];
  // 行渲染
  rowRenderer: (row: RowData) => React.ReactNode | JSX.Element;
  // 行高
  rowHeight?: number;
}

interface VirtualListState {
  rowHeight: number;
  scrollTop: number;
  scrollRow: number;
}

const ROW_PREFIX = 'virtual-row-';

const getRowClassName = (key?: string) => {
  if (!key) {
    return `${ROW_PREFIX}0-0`;
  }
  return `${ROW_PREFIX}${key}`;
};

/**
 * 虚拟滚动列表
 */
class VirtualList extends React.Component<VirtualListProps, VirtualListState> {
  listRef: React.RefObject<List> = React.createRef();
  timer?: number;

  constructor(props: VirtualListProps) {
    super(props);
    this.state = {
      rowHeight: props.rowHeight || 30,
      scrollTop: -1,
      scrollRow: -1,
    };
  }

  /**
   * 滚动到指定行
   * @param index {number}
   */
  public scrollToRow = (index: number) => {
    if (this.listRef.current) {
      this.listRef.current.scrollToRow(index);
      console.log('scrollToRow', this.listRef.current);
      this.setState({
        scrollRow: -1,
      });
    } else {
      this.setState({
        scrollRow: index,
      });
      this.handleScrollProps();
    }
  };

  /**
   * 滚动到指定位置
   * @param scrollTop {number}
   */
  public scrollToPosition = (scrollTop: number) => {
    if (this.listRef.current) {
      this.listRef.current.scrollToPosition(scrollTop);
      this.setState({
        scrollTop: -1,
      });
    } else {
      this.setState({
        scrollTop,
      });
      this.handleScrollProps();
    }
  };

  render() {
    const { data, rowRenderer } = this.props;
    const { rowHeight } = this.state;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={this.listRef}
            height={height}
            width={width}
            rowCount={data.length}
            rowHeight={rowHeight}
            rowRenderer={({ index, key, style, isScrolling, isVisible }) => (
              <div className={getRowClassName(key)} key={key} style={style}>
                {rowRenderer({ index, data: data[index], isScrolling, isVisible })}
              </div>
            )}
          />
        )}
      </AutoSizer>
    );
  }

  componentDidMount() {
    if (!this.props.rowHeight && this.listRef.current) {
      const setRowHeight = () => {
        const [row] = document.getElementsByClassName(getRowClassName()) || [];
        if (row) {
          const firstChild = row.firstChild as HTMLDivElement;
          if (firstChild) {
            this.setState({
              rowHeight: firstChild.clientHeight,
            });
          }
        }
      };
      this.tick(setRowHeight);
    }
  }

  private handleScrollProps = () => {
    const scroll = () => {
      if (this.state.scrollTop > 0) {
        this.scrollToPosition(this.state.scrollTop);
      }
      if (this.state.scrollRow > 0) {
        this.scrollToRow(this.state.scrollRow);
      }
    };
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = this.tick(scroll);
  };

  private tick(fn: () => void) {
    return window.setTimeout(() => {
      fn();
    }, 16);
  }
}

export default VirtualList;
