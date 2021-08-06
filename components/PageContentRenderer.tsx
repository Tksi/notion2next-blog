import { VFC } from 'react';
import { BlocksChildrenListResponse } from '@notionhq/client/build/src/api-endpoints';
import { Block } from '@notionhq/client/build/src/api-types';

type Props = {
  pageContent: BlocksChildrenListResponse;
};

export const PageContentRenderer: VFC<Props> = ({ pageContent }) => {
  return (
    <>
      {pageContent.results.map((block: Block) => {
        <BlockRenderer block={block} />;
      })}
    </>
  );
};

const BlockRenderer: VFC<{ block: Block }> = ({ block }) => {
  // [] BlockからJSXにする
  return <></>;
};
