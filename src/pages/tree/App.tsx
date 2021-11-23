import React, { useEffect, useRef, useState } from 'react';
import InviteUser from './select-tree/components/InviteUser';
import { SearchFun } from './select-tree/components/InviteUserSearch';
import { getMockTreeData } from './select-tree/api/TreeNode';
import VirtualList, { RowData } from './select-tree/components/VirtualList';

const handleSearch: SearchFun = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve(getMockTreeData()) : reject('api error');
    }, 500);
  });
};

function App() {
  const [list, setList] = useState(new Array(500));

  const listRef = useRef<VirtualList>(null);

  useEffect(() => {
    if (listRef.current) {
      console.log('App SelectUserTree', listRef.current);
      listRef.current.scrollToRow(20);
    }
  }, []);

  const rowRenderer = (data: RowData<string>) => {
    return (
      <div className="custom-height">
        <div>{data.index}</div>
      </div>
    );
  };

  return (
    <div>
      <InviteUser width={640} height={500} onSearch={handleSearch} />
      <div className="list-wrap">
        <VirtualList ref={listRef} data={list} rowRenderer={rowRenderer} />
      </div>
    </div>
  );
}

export default App;
