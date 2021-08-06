import { VFC } from 'react';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import {
  PageInfo,
  getPageList,
  getPageInfo,
  getPageContent,
} from 'lib/notionAPI';
import { BlocksChildrenListResponse } from '@notionhq/client/build/src/api-endpoints';

type Params = {
  page_id: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: (await getPageList()).map((v) => ({ params: { page_id: v.page_id } })),
  fallback: false,
});

type Props = { pageInfo: PageInfo; pageContent: BlocksChildrenListResponse };

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const pageInfo = await getPageInfo(params?.page_id ?? '');
  const pageContent = await getPageContent(params?.page_id ?? '');
  return {
    props: { pageInfo, pageContent },
  };
};

const page_id: VFC<Props> = ({ pageInfo, pageContent }) => {
  return (
    <>
      <h1>{JSON.stringify(pageInfo)}</h1>
      {/* // [] renderするコンポーネントつくる */}
      <h1>{JSON.stringify(pageContent)}</h1>
    </>
  );
};

export default page_id;
