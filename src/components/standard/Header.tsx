import Head from "next/head";
import { IHeaderProps } from "../../utils/types";

export default function Header(props: IHeaderProps) {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.content} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}