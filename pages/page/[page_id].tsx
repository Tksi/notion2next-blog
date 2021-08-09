import { VFC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  PageInfo,
  getPageList,
  getPageInfo,
  getPageContent,
} from 'lib/notionAPI';
import { Block } from '@notionhq/client/build/src/api-types';
import { PageContentRenderer } from 'components/PageContentRenderer';
type Params = {
  page_id: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: (await getPageList()).map((v) => ({ params: { page_id: v.page_id } })),
  fallback: false,
});

type Props = { pageInfo: PageInfo; pageContent: Block[] };

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
  // [] pageaInfoのせる
  // [] Tagごとのページ作る
  // [] CSS追加
  return (
    <>
      <PageContentRenderer pageContent={pageContent} />
    </>
  );
};

export default page_id;
