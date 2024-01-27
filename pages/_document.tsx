import { Html, Head, Main, NextScript } from 'next/document'
import HeadComp from '@/components/global/head'
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <HeadComp />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
