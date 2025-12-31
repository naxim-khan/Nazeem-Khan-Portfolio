import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({
    title,
    description,
    keywords,
    image = '/img/nazeem.jpg',
    url,
    author = 'Nazeem Khan'
}) => {
    const router = useRouter();
    const siteName = 'Nazeem Khan | Full-Stack Web Developer';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const canonicalUrl = url || `https://nazeem-khan-portfolio.vercel.app${router.asPath}`;
    const defaultDescription = 'Professional MERN Stack web developer freelancer specialized in building premium, responsive, and high-performance web applications.';
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || 'MERN Stack, Web Developer, Freelancer, React, Node.js, Next.js, Portfolio, Nazeem Khan';
 
    return ( 
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="author" content={author} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={image} />

            {/* Google Site Verification */}
            <meta name="google-site-verification" content="your-verification-code-here" />
        </Head>
    );
};

export default SEO;
