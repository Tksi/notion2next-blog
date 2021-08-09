import { VFC } from 'react';
import Link from 'next/link';
import { PageList, PageInfo, getPageList } from 'lib/notionAPI';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticProps: GetStaticProps<{ pageList: PageList }> =
  async () => ({
    props: { pageList: await getPageList() },
  });

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// [] ページタイトルはDBのtitleにする
// [] タグ表示
const index: VFC<Props> = ({ pageList }) => {
  return (
    <>
      <ul>
        {pageList.map((v: PageInfo) => (
          <li key={v.page_id}>
            <Link href={`/page/${v.page_id}`}>
              <a>{v.Name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default index;
