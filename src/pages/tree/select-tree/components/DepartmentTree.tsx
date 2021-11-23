/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Tree, { RendererProps } from 'react-virtualized-tree';
import { FlattenedTreeNode, TreeNode } from '../api/TreeNode';
import classNames from 'classnames';
import './DepartmentTree.scss';
import {
  getLastNode,
  getLastNodeIdList,
  updateNodeExpanded,
  updateSelection,
} from '../utils/change-tree';

/**
 * 邀请参会成员
 * @constructor
 * @design https://codesign.woa.com/s/6ym7ZRGG1WjAYED/qxWyZ1NbPqjmVXk/inspect
 */
export default class DepartmentTree extends React.Component<SelectedTreeProps, SelectedTreeState> {
  state: SelectedTreeState;
  needTick = false;

  constructor(props: SelectedTreeProps) {
    super(props);
    this.state = {
      treeData: this.props.data,
      selected: [],
    };
  }

  handleSelectionChange = (node: FlattenedTreeNode) => {
    const checked = !node.state.checked;
    let selected: FlattenedTreeNode[];
    if (checked) {
      selected = [...this.state.selected, ...getLastNode(node)];
    } else {
      const deleteIds = getLastNodeIdList(node);
      selected = this.state.selected.filter((item) => !deleteIds.includes(item.id));
    }
    const treeData = updateSelection(this.state.treeData, node);
    this.setState({
      treeData,
      selected,
    });
    const { onSelectChange } = this.props;
    if (onSelectChange) {
      onSelectChange(selected);
    }
  };

  handleExpandedChange = (node: FlattenedTreeNode) => {
    this.setState({
      treeData: updateNodeExpanded(this.state.treeData, node),
    });
  };

  renderSelectionIcon = (node: FlattenedTreeNode) => {
    const {
      state: { checked, halfChecked },
    } = node;
    let iconClassName = 'mc-icon-none';
    if (checked) {
      iconClassName = 'mc-icon-all';
    } else if (halfChecked) {
      iconClassName = 'mc-icon-half';
    }
    return (
      <i
        className={classNames('mc-icon', iconClassName)}
        onClick={() => this.handleSelectionChange(node)}
      />
    );
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
    const { measure } = rest;
    const node: FlattenedTreeNode = rest.node as any;
    const { state } = node || {};
    if (this.needTick) {
      this.tick(measure);
      this.needTick = false;
    }
    return (
      <div
        className={classNames(
          'mc-tree-node',
          state.disabled ? 'disabled' : '',
          this.props.className,
        )}
      >
        {this.renderSelectionIcon(node)}
        {this.renderContent(node)}
      </div>
    );
  };

  handleTreeChange = (nodes: any[]) => {
    console.log('handleTreeChange', nodes);
  };

  render() {
    const { height, className } = this.props;
    const { treeData } = this.state;
    return (
      <div style={{ height }}>
        <Tree nodes={treeData} onChange={this.handleTreeChange} nodeMarginLeft={0}>
          {(rest) => (
            <div style={rest.style} className={classNames('mc-tree-item', className)}>
              {this.createNodeRenderer(rest as any)}
            </div>
          )}
        </Tree>
      </div>
    );
  }

  tick(fn: () => void) {
    setTimeout(fn, 16);
  }
}

export interface SelectedTreeProps {
  height: number;
  data: TreeNode[];
  className?: string;
  renderItem?: (node: FlattenedTreeNode) => JSX.Element | React.ReactNode;
  onSelectChange?: (node: FlattenedTreeNode[]) => void;
  onSelectClick?: (node: FlattenedTreeNode) => void;
  onExpandClick?: (node: FlattenedTreeNode) => void;
}

interface SelectedTreeState {
  treeData: TreeNode[];
  selected: FlattenedTreeNode[];
}
