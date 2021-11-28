import type { Node } from 'react-virtualized-tree';

/**
 * FlattenedNode
 */
export interface FlattenedTreeNode extends TreeNode {
  /**
   * 深度
   */
  deepness: number;
  /**
   * 父节点id列表
   */
  parents: string[];
}

/**
 * 存放自定义数据
 */
export interface NodeState {
  // 展开
  expanded?: boolean;
  // 选中
  checked?: boolean;
  // 半选中
  halfChecked?: boolean;
  // 禁止选择
  disabled?: boolean;
  // 子节点选中数量
  checkedCount: number;

  [key: string]: any;
}

/**
 * 树节点
 */
export interface TreeNode extends Node {
  id: string;
  name: string;
  state: NodeState;
  children: TreeNode[];
}

const len = import.meta.env.PROD ? 10 : 10;
const deep = import.meta.env.PROD ? 6 : 5;

export function getMockTreeData(path = '0', level = deep): TreeNode[] {
  const list: TreeNode[] = [];
  for (let i = 0; i < len; i += 1) {
    const key = `${path}-${i}`;
    const treeNode: TreeNode = {
      id: key,
      name: `name-${key}`,
      state: {
        expanded: true,
        checked: false,
        disabled: false,
        checkedCount: 0,
      },
      children: [],
    };

    if (level > 0) {
      treeNode.children = getMockTreeData(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}
