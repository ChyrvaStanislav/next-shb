import Image from 'next/image'
import styles from './page.module.css'
import { ContentClient } from 'dc-delivery-sdk-js';
import Link from "next/link";
import axios from "axios";

export default async function Home() {


  const { data } = await axios.get('https://prod.api.solutionshub.epam.com/api/public/content/v2/blogs2/list?size=8&page=1')

  return (
    <main className={styles.main}>
      {data.blogList.map((item: { title: string, linkSrc: string }) => <Link key={item.title} href={item.linkSrc.split('/')[3]}>{item.title}</Link>)}
    </main>
  )
}
