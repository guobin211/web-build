import React, { useState } from 'react';
import { TreeNode } from '../api/TreeNode';

export const TreeContext = React.createContext<TreeContextState>({
  treeData: [],
  onChange: () => {
    return;
  },
});

export interface TreeContextState {
  treeData: TreeNode[];
  onChange: (nodes: TreeNode[]) => void;
}

export interface TreeProviderProps {
  treeData: TreeNode[];
}

export const TreeProvider: React.FC<TreeProviderProps> = (props) => {
  const [treeData, setTreeData] = useState(props.treeData);
  const value = {
    treeData,
    onChange: setTreeData,
  };
  return <TreeContext.Provider value={value}>{props.children}</TreeContext.Provider>;
};
