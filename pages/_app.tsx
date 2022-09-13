import type { AppProps } from "next/app"
import "/styles.css"
import { ThemeProvider } from "next-themes"
import Head from "next/head"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Todo List</title>
      </Head>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className="overflow-auto font-Oswald text-black transition duration-500">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  )
}
