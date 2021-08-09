import { Client } from '@notionhq/client';
import { BlocksChildrenListResponse } from '@notionhq/client/build/src/api-endpoints';
import { Block } from '@notionhq/client/build/src/api-types';

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export type PageInfo = {
  Name: string;
  page_id: string;
  ['Last edited']: string;
  Tags: { id: string; name: string; color: string }[];
};

export type PageList = PageInfo[];

export const getPageList = async (): Promise<PageList> => {
  // これデフォルトのソートどうなってるの
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? '',
    sorts: [
      {
        property: 'Last edited',
        direction: 'descending',
      },
    ],
  });

  return res.results.map((v) => ({
    page_id: v.id,
    // @ts-ignore
    Name: v.properties.Name.title[0].plain_text,
    // @ts-ignore
    ['Last edited']: v.properties['Last edited'].last_edited_time,
    // @ts-ignore
    Tags: v.properties.Tags.multi_select,
  }));
};

export const getPageInfo = async (page_id: string): Promise<PageInfo> => {
  const res = await notion.pages.retrieve({ page_id });
  return {
    page_id: res.id,
    // @ts-ignore
    Name: res.properties.Name.title[0].plain_text,
    // @ts-ignore
    ['Last edited']: res.properties['Last edited'].last_edited_time,
    // @ts-ignore
    Tags: res.properties.Tags.multi_select,
  };
};

export const getPageContent = async (page_id: string): Promise<Block[]> => {
  const arr = [];
  let start_cursor: string | undefined = undefined;
  for (;;) {
    const res: BlocksChildrenListResponse = await notion.blocks.children.list({
      block_id: page_id,
      start_cursor,
    });
    arr.push(...res.results);
    if (!res.has_more) return arr;
    start_cursor = res.next_cursor as string;
  }
};
