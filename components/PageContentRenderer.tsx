import { VFC } from 'react';
import { Block } from '@notionhq/client/build/src/api-types';

type Props = {
  pageContent: Block[];
};

export const PageContentRenderer: VFC<Props> = ({ pageContent }) => {
  return (
    <>
      {pageContent.map((block: Block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
};

const BlockRenderer: VFC<{ block: Block }> = ({ block }) => {
  const [type, value] = [
    block.type,
    // @ts-ignore
    block[block.type].text?.map((v) => v.plain_text).join(''),
  ];
  switch (type) {
    case 'paragraph': {
      return <p>{value}</p>;
    }
    case 'heading_1': {
      return <h1>{value}</h1>;
    }
    case 'heading_2': {
      return <h2>{value}</h2>;
    }
    case 'heading_3': {
      return <h3>{value}</h3>;
    }
    case 'bulleted_list_item': {
      return <li>{value}</li>;
    }
    case 'numbered_list_item': {
      return <li>{value}</li>;
    }
    case 'to_do': {
      return <li>{value}</li>;
    }
    case 'toggle': {
      return <li>{value}</li>;
    }
    case 'child_page': {
      return <li>{value}</li>;
    }
    default: {
      return <p>{value}</p>;
    }
  }
};
