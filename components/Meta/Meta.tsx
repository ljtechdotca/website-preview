import Head from "next/head";

interface MetaProps {
  title: string;
  description: string;
}

export const Meta = ({ title, description }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta name="author" content="ljtech" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
