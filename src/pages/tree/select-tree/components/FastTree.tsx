/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import type { Node } from 'react-virtualized-tree';
import { renderers } from 'react-virtualized-tree';
// @ts-ignore
import UnstableFastTree from 'react-virtualized-tree/es/UnstableFastTree';
// @ts-ignore
import TreeState from 'react-virtualized-tree/es/state/TreeState';

const { Deletable, Expandable, Favorite } = renderers;

export interface FastTreeProps {
  treeData: Node[];
}

interface FastTreeState {
  nodes: any;
}

export default class FastTree extends React.Component<FastTreeProps, FastTreeState> {
  constructor(props: FastTreeProps) {
    super(props);
    this.state = {
      nodes: TreeState.createFromTree(props.treeData),
    };
  }

  handleChange = (nodes: any) => {
    this.setState({ nodes });
  };

  render() {
    return (
      <UnstableFastTree nodes={this.state.nodes} onChange={this.handleChange} nodeMarginLeft={10}>
        {(data: any) => {
          const { style, node, ...rest } = data;
          return (
            <div style={style}>
              <Expandable node={node} {...rest}>
                {node.name}
              </Expandable>
            </div>
          );
        }}
      </UnstableFastTree>
    );
  }
}
