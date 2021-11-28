import { FlattenedTreeNode, NodeState, TreeNode } from '../api/TreeNode';

/**
 * 获取最后的子节点
 * @param node
 */
export function getLastNode(node: TreeNode | FlattenedTreeNode): FlattenedTreeNode[] {
  const res: FlattenedTreeNode[] = [];
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      res.push(...getLastNode(child));
    });
  } else {
    res.push(node as FlattenedTreeNode);
  }
  return res;
}

/**
 * 获取最后子节点的id列表
 * @param node
 */
export function getLastNodeIdList(node: TreeNode | FlattenedTreeNode): string[] {
  const res: string[] = [];
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      res.push(...getLastNodeIdList(child));
    });
  } else {
    res.push(node.id);
  }
  return res;
}

/**
 * 铺平tree
 * @param tree
 * @param parents
 */
export function flatten(tree: TreeNode, parents: string[] = []): FlattenedTreeNode[] {
  const res: FlattenedTreeNode[] = [];
  res.push({
    ...tree,
    parents,
    deepness: parents.length,
  });
  if (tree.children && tree.children.length > 0) {
    tree.children.forEach((child) => {
      res.push(...flatten(child, parents.concat(tree.id)));
    });
  }
  return res;
}

/**
 * 控制展开或折叠
 * @param nodes
 * @param updateNode
 */
export function updateNodeExpanded(nodes: TreeNode[], updateNode: FlattenedTreeNode) {
  return nodes.map((node) => {
    if (node.id === updateNode.id) {
      return {
        ...node,
        state: {
          ...node.state,
          expanded: !node.state.expanded,
        },
      };
    }
    if (node.children && node.children.length !== 0) {
      node.children = updateNodeExpanded(node.children, updateNode);
    }
    return node;
  });
}

/**
 * 更新选中状态
 * @param nodes
 * @param updateNode
 * @param deepness
 */
export function updateSelection(
  nodes: TreeNode[],
  updateNode: FlattenedTreeNode,
  deepness = 0,
): TreeNode[] {
  const checked = !updateNode.state.checked;
  return nodes.map((node) => {
    // 父节点
    if (updateNode.parents[deepness] === node.id) {
      deepness++;
      const parentNode = {
        ...node,
        children: updateSelection(node.children, updateNode, deepness),
      };
      parentNode.state = getCheckState(parentNode, checked);
      return parentNode;
    }
    // 节点本身
    if (node.id === updateNode.id) {
      return {
        ...node,
        state: {
          ...node.state,
          checked: checked,
        },
        children: node.children ? updateChildren(node.children, checked) : [],
      };
    }
    // 不相关的节点
    return node;
  });
}

/**
 * 合并选中的node
 * @param tree
 * @param selected
 */
export function mergeTreeState(tree: TreeNode[], selected: string[]): TreeNode[] {
  return tree.map((node) => {
    if (selected.includes(node.id)) {
      node.state = {
        ...node.state,
        checked: true,
      };
      if (node.children && node.children.length > 0) {
        node.children = updateChildren(node.children, true);
        node.state = getCheckState(node, true);
      }
    }
    if (node.children && node.children.length > 0) {
      node.children = mergeTreeState(node.children, selected);
    }
    return node;
  });
}

function getCheckState(node: TreeNode, checked: boolean): NodeState {
  if (node.children && node.children.length > 0) {
    const { checkedCount } = node.state;
    const count = checked ? checkedCount + 1 : checkedCount - 1;
    return {
      ...node.state,
      checkedCount: count,
      checked: count === node.children.length,
      halfChecked: count > 0 && count < node.children.length,
    };
  }
  return node.state;
}

function updateChildren(nodes: TreeNode[], selected: boolean): TreeNode[] {
  return nodes.map((n) => ({
    ...n,
    children: n.children ? updateChildren(n.children, selected) : [],
    state: {
      ...n.state,
      checked: selected,
    },
  }));
}
