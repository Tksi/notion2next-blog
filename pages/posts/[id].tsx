import { VFC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { PageList, getPageList } from 'lib/notionAPI';
import Link from 'next/link';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getPageList()).map((v) => ({ params: v })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // どうもid以外は消されるっぽい\\
  // [] page情報とcontentをもってくる
  console.log(params);
  return {
    props: params,
  };
};

const id: VFC = (pageList) => {
  console.log(pageList);
  return (
    <>
      <h1>{pageList.id}</h1>
    </>
  );
};

export default id;
