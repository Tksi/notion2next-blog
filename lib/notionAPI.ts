import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export type PageList = { title: string; id: string }[];

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
    // @ts-ignore titleが無いとか言われる(@notionhq/clientのバグ？)
    title: v.properties.Name.title[0].plain_text,
    id: v.id,
  }));
};
