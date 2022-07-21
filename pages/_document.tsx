import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang="en-US">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="author" content="Zahtec" />
                <meta name="robots" content="noarchive,noimageindex" />

                <meta name="og:url" content="https://www.zahtec.com" />
                <meta name="og:image" content="/images/favicon.png" />
                <meta name="og:image:secure_url" content="/images/favicon.png" />
                <meta name="og:image:width" content="200" />
                <meta name="og:image:height" content="200" />
                <meta name="og:image:alt" content="Zahtec logo" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@zahtec" />
                <meta name="twitter:image" content="https://www.zahtec.com/images/favicon.png" />

                <meta name="theme-color" content="#000000" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@700;900&display=swap" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="kit.fontawesome.com" />
                <link rel="preconnect" href="ka-f.fontawesome.com" />

                <link rel="icon" sizes="any" href="/images/favicon.png" />
                <link rel="shortcut icon" href="/images/favicon.png" />

                <Script src="https://kit.fontawesome.com/0538947422.js" strategy="afterInteractive" />
            </Head>
            <Main />
            <NextScript />
        </Html>
    );
}
