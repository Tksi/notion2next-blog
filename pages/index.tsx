import { VFC } from 'react';
import Link from 'next/link';
import { PageList, getPageList } from 'lib/notionAPI';

type Props = { pageList: PageList };

export const getStaticProps = async (): Promise<{ props: Props }> => {
  return {
    props: { pageList: await getPageList() },
  };
};

const index: VFC<Props> = ({ pageList }) => {
  return (
    <>
      <ul>
        {pageList.map((v) => {
          return (
            <li key={v.id}>
              <Link href={`/posts/${v.id}`}>
                <a>{v.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default index;
