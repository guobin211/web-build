/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import Tree, { RendererProps } from 'react-virtualized-tree';
import { FlattenedTreeNode, TreeNode } from '../api/TreeNode';
import classNames from 'classnames';
import './DepartmentTree.scss';
import {
  getLastNode,
  getLastNodeIdList,
  updateNodeExpanded,
  updateSelection,
} from '../utils/tree-utils';
import Selection from './Selection';

/**
 * 邀请参会成员
 * @constructor
 * @design https://codesign.woa.com/s/6ym7ZRGG1WjAYED/qxWyZ1NbPqjmVXk/inspect
 */
export default class DepartmentTree extends React.Component<SelectedTreeProps, SelectedTreeState> {
  state: SelectedTreeState;
  selected: FlattenedTreeNode[] = [];

  constructor(props: SelectedTreeProps) {
    super(props);
    this.state = {
      treeData: this.props.data,
    };
  }

  handleSelectionChange = (node: FlattenedTreeNode) => {
    const checked = !node.state.checked;
    console.time('updateSelection');
    const treeData = updateSelection(this.state.treeData, node);
    console.timeEnd('updateSelection');
    this.setState({
      treeData,
    });
    console.time('selected');
    if (checked) {
      this.selected = [...this.selected, ...getLastNode(node)];
    } else {
      const deleteIds = getLastNodeIdList(node);
      this.selected = this.selected.filter((item) => !deleteIds.includes(item.id));
    }
    console.timeEnd('selected');
    const { onSelectChange } = this.props;
    if (typeof onSelectChange === 'function') {
      onSelectChange(this.selected);
    }
  };

  handleExpandedChange = (node: FlattenedTreeNode) => {
    console.time('updateNodeExpanded');
    const treeData = updateNodeExpanded(this.state.treeData, node);
    console.timeEnd('updateNodeExpanded');
    this.setState({
      treeData,
    });
  };

  renderExpandIcon = (node: FlattenedTreeNode) => {
    const {
      state: { expanded },
      children,
    } = node;
    if (!children || children.length === 0) {
      return <i className={classNames('mc-icon')} />;
    }
    return (
      <i
        onClick={() => this.handleExpandedChange(node)}
        className={classNames('mc-icon', expanded ? 'mc-icon-down' : 'mc-icon-right')}
      />
    );
  };

  renderContent = (node: FlattenedTreeNode) => {
    const left = 36 + node.deepness * 16;
    return (
      <div className={classNames('mc-tree-node-flex')} style={{ paddingLeft: left }}>
        {this.renderExpandIcon(node)}
        <span className={classNames('content-icon', 'group')} />
        <div className={classNames('mc-tree-node-content')}>
          id: {node.id}, name: {node.name}
        </div>
      </div>
    );
  };

  createNodeRenderer = (rest: RendererProps<TreeNode>) => {
    const node: FlattenedTreeNode = rest.node as any;
    const { state } = node || {};
    return useMemo(
      () => (
        <div
          className={classNames(
            'mc-tree-node',
            state.disabled ? 'disabled' : '',
            this.props.className,
          )}
        >
          <Selection node={node} onClick={(d) => this.handleSelectionChange(d)} />
          {this.renderContent(node)}
        </div>
      ),
      [rest.index, rest.node],
    );
  };

  handleTreeChange = () => {return};

  render() {
    const { height, className } = this.props;
    const { treeData } = this.state;
    return (
      <div style={{ height }}>
        <Tree nodes={treeData} onChange={this.handleTreeChange} nodeMarginLeft={0}>
          {(rest) => (
            <div
              key={rest.node.id}
              style={rest.style}
              className={classNames('mc-tree-item', className)}
            >
              {this.createNodeRenderer(rest as any)}
            </div>
          )}
        </Tree>
      </div>
    );
  }
}

export interface SelectedTreeProps {
  height: number;
  data: TreeNode[];
  renderItem: (node: FlattenedTreeNode) => JSX.Element | React.ReactNode;
  className?: string;
  onSelectChange?: (node: FlattenedTreeNode[]) => void;
  onSelectClick?: (node: FlattenedTreeNode) => void;
  onExpandClick?: (node: FlattenedTreeNode) => void;
}

interface SelectedTreeState {
  treeData: TreeNode[];
}
