import {ContentClient} from "dc-delivery-sdk-js";
import ReactMarkdown from "react-markdown";


// @ts-ignore
const BlogPost = async ({ params }) => {
  console.log(params.id)

  const client = new ContentClient({
    hubName: 'epammarketplacetest',
  });

  const data = await client
    .getContentItemByKey(params.id);
  console.log(data)

  return (
    <main>
      <h1>{ params.id }</h1>
      {data?.body?.content && data?.body?.content.map((item: { text: string }) => <ReactMarkdown key={item?.text}>{item?.text}</ReactMarkdown>)}
    </main>
  );
};

export default BlogPost;