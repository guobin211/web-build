/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Tree, { RendererProps } from 'react-virtualized-tree';
import type { FlattenedTreeNode, TreeNode } from '../api/TreeNode';

/**
 * Tree组件,自定义渲染节点
 */
export default class BaseTree extends React.PureComponent<BaseTreeProps> {
  needTick = false;

  constructor(props: BaseTreeProps) {
    super(props);
  }

  handleTreeChange: OnTreeChange = (nodes) => {
    if (this.props.onChange) {
      this.props.onChange(nodes);
    }
  };

  createNodeRenderer = (rest: RendererProps<TreeNode>, renderNode: NodeRenderer) => {
    const { node, measure, style } = rest;
    if (this.needTick) {
      this.tick(measure);
      this.needTick = false;
    }
    return <div style={style}>{renderNode(node as any)}</div>;
  };

  render() {
    const { height, renderNode, data } = this.props;
    return (
      <div style={{ height }}>
        <Tree nodes={data} onChange={this.handleTreeChange} nodeMarginLeft={0}>
          {(rest) => this.createNodeRenderer(rest as any, renderNode)}
        </Tree>
      </div>
    );
  }

  tick(fn: () => void) {
    setTimeout(fn, 16);
  }
}

export type OnTreeChange<T = any> = (data: T[]) => void;

export type NodeRenderer = (node: FlattenedTreeNode) => JSX.Element | React.ReactNode;

export interface BaseTreeProps {
  // 容器高度
  height: number;
  // 数据
  data: TreeNode[];
  // 渲染节点的方法
  renderNode: NodeRenderer;
  onChange?: OnTreeChange;
}
