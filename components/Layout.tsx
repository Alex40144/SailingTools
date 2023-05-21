import Head from 'next/head'

export const siteTitle = 'Sailing Tools'

export default function Layout({
    children
}: {
    children: React.ReactNode
    home?: boolean
}) {
    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/" />
                <title>{siteTitle}</title>
                <meta
                    name="description"
                    content="Tools for calculating race results"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6284416950782621"
                    crossOrigin="anonymous">
                </script>
            </Head>
            <main>{children}</main>
        </div>
    )
}