import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html>
     <Head>
          <script async src="https://platform.twitter.com/widgets.js" />
        </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
  )
}
