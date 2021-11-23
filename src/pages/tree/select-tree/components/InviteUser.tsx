/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import classNames from 'classnames';
import './InviteUser.scss';
import InviteUserSearch, { SearchFun } from './InviteUserSearch';
import InviteUserResultList from './InviteUserResultList';
import { FlattenedTreeNode, getMockTreeData, TreeNode } from '../api/TreeNode';
import DepartmentTree from './DepartmentTree';
import { mergeTreeState } from '../utils/change-tree';

export interface SelectUserProps {
  onSearch: SearchFun;
  className?: string;
  width?: number;
  height: number;
}

export interface SelectUserState {
  result: FlattenedTreeNode[];
  treeData: any[];
  keyword: string;
}

/**
 * 邀请参会成员
 * @design https://codesign.woa.com/s/6ym7ZRGG1WjAYED/qxWyZ1NbPqjmVXk/inspect
 */
export default class InviteUser extends React.PureComponent<SelectUserProps, SelectUserState> {
  state: SelectUserState;

  constructor(props: SelectUserProps) {
    super(props);
    this.state = {
      result: [],
      treeData: getMockTreeData(),
      keyword: '',
    };
  }

  handleResult = (apiData: TreeNode[]) => {
    const ids = this.state.result.map((node) => node.id);
    const treeData = mergeTreeState(apiData, ids);
    this.setState({
      treeData,
    });
  };

  renderTitle = (data: TreeNode[]) => {
    return (
      <>
        <div className={classNames('result-title-notice')}>请选择需开通的企业成员</div>
        <div className={classNames('result-title-count')}>
          <span>已选择: {data.length} 人</span>
        </div>
      </>
    );
  };

  renderFooter = (data: TreeNode[]) => {
    return (
      <>
        <div className={classNames('result-count')}>
          <span>已经选择: {data.length} 人</span>
        </div>
        <div className={classNames('result-actions')}>
          <button type="button" className={classNames('result-btn')}>
            取消
          </button>
          <button type="button" className={classNames('result-btn confirm')}>
            确定
          </button>
        </div>
      </>
    );
  };

  handleChange = (data: any) => {
    console.log('handleChange', data);
    this.setState({
      result: data,
    });
  };

  render() {
    const { className, width, height, onSearch } = this.props;
    const { result, treeData } = this.state;
    return (
      <div className={classNames('tree-select', className)} style={{ width, height }}>
        <div className={classNames('tree-select-left')}>
          <div className={classNames('tree-select-left-title')}>
            <InviteUserSearch onSearch={onSearch} onResult={this.handleResult} />
          </div>
          <DepartmentTree height={height - 50} data={treeData} onSelectChange={this.handleChange} />
        </div>
        <InviteUserResultList renderTitle={this.renderTitle} data={result} height={height} />
      </div>
    );
  }
}
