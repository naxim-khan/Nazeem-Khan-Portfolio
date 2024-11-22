import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className=" ">
      <Head>
        <link rel="shortcut icon" type="image/svg" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Sora:wght@100..800&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="nDvElDBuo4429FmAToBQ-P-5es5MuQt5E3L_epb755k" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
