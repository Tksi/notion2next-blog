import { VFC } from 'react';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { getPageList, getPageInfo, PageInfo } from 'lib/notionAPI';

type Params = {
  page_id: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: (await getPageList()).map((v) => ({ params: { page_id: v.page_id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PageInfo, Params> = async ({
  params,
}) => {
  const pageInfo = await getPageInfo(params?.page_id ?? '');
  // [] contentをもってくる
  return {
    props: pageInfo,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const id: VFC<Props> = (pageInfo) => {
  return (
    <>
      <h1>{JSON.stringify(pageInfo)}</h1>
    </>
  );
};

export default id;
