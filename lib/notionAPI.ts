import { Client } from '@notionhq/client';

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
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? '',
    filter: {
      and: [
        {
          property: 'Tags',
          multi_select: {
            does_not_contain: '授業',
          },
        },
        {
          property: 'Tags',
          multi_select: {
            does_not_contain: 'memo',
          },
        },
      ],
    },
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
