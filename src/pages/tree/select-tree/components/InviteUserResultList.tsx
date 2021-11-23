import React from 'react';
import classNames from 'classnames';
import { TreeNode } from '../api/TreeNode';

export interface ResultProps {
  data: TreeNode[];
  height: number;
  renderTitle?: (data: TreeNode[]) => React.ReactNode;
  renderFooter?: (data: TreeNode[]) => React.ReactNode;
}

/**
 * 选中成员
 * @param props
 * @constructor
 */
function InviteUserResultList(props: ResultProps) {
  const { renderTitle, renderFooter, data, height } = props;

  function getScrollHeight(): number {
    if (renderFooter && renderTitle) {
      return height - 104;
    } else if (renderFooter) {
      return height - 60;
    } else if (renderTitle) {
      return height - 44;
    }
    return height;
  }

  return (
    <div style={{ height }} className={classNames('tree-select-right')}>
      {renderTitle && <div className={classNames('result-title')}>{renderTitle(data)}</div>}
      <div className={classNames('result-list')} style={{ height: getScrollHeight() }}>
        <ul className={classNames('result-list-scroll')}>
          {data.map((item, index) => (
            <li key={index} className={classNames('result-list-scroll-item')}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {renderFooter && <div className={classNames('result-footer')}>{renderFooter(data)}</div>}
    </div>
  );
}

export default InviteUserResultList;
