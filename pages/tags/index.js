import { getTags } from '../../lib/blogs';
import Link from 'next/link';

export default function TagsIndex({ tags }) {
  return (
    <div className="container">
      <h1>All Tags</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag}>
            <Link href={`/tags/${tag}`}>
              <a>{tag}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const tags = getTags();
  return {
    props: {
      tags,
    },
  };
}
