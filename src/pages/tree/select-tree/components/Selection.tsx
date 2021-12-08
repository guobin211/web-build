import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { NodeState, TreeNode } from '../api/TreeNode';

export type NodeClick = (node: any) => void;

export interface SelectionProps {
  node: TreeNode;
  onClick: NodeClick;
}

const getClassNames = (state: NodeState) => {
  const { checked, halfChecked } = state;
  let iconClassName = 'mc-icon-none';
  if (checked) {
    iconClassName = 'mc-icon-all';
  } else if (halfChecked) {
    iconClassName = 'mc-icon-half';
  }
  return iconClassName;
};

export default function Selection(props: SelectionProps) {
  const [iconClassName, setIconClassName] = useState(getClassNames(props.node.state));

  const handleClick = () => {
    setIconClassName(iconClassName === 'mc-icon-all' ? 'mc-icon-none' : 'mc-icon-all');
    props.onClick(props.node);
  };

  useEffect(() => {
    const className = getClassNames(props.node.state);
    setIconClassName(className);
  }, [props.node.state]);

  return useMemo(
    () => <i className={classNames('mc-icon', iconClassName)} onClick={handleClick} />,
    [props.node.state, iconClassName],
  );
}
