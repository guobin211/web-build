import React, { useEffect, useState } from 'react';
import { TreeNode } from '../api/TreeNode';
import classNames from 'classnames';

export type SearchFun = (value: string) => Promise<TreeNode[]>;

export interface SearchProps {
  className?: string;
  onSearch?: SearchFun;
  onResult?: (data: TreeNode[]) => void;
  keywords?: string;
  placeholder?: string;
}

/**
 * 搜索部门和成员
 * @param props
 * @constructor
 */
function InviteUserSearch(props: SearchProps) {
  const { onSearch, onResult, placeholder, className, keywords: defaultKeywords } = props;
  const [keywords, setKeywords] = useState(defaultKeywords || '');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    handleSearchClick().then();
  }, [props.onSearch, props.keywords]);

  async function handleSearchClick() {
    if (onSearch && !pending) {
      setPending(true);
      onSearch(keywords)
        .then((res) => {
          if (onResult) {
            onResult(res);
          }
          setPending(false);
        })
        .catch(() => {
          setPending(false);
        });
    }
  }

  function handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Enter' && !pending) {
      handleSearchClick().then();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={classNames('search-wrap', className)}>
      <input
        type="text"
        onChange={(ev) => setKeywords(ev.target.value)}
        value={keywords}
        placeholder={placeholder}
        className={classNames('search-input', className)}
      />
    </div>
  );
}

export default InviteUserSearch;
