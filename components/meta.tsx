import Head, { defaultHead } from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { countryFilterState, pageCounterState, portFilterState } from "../libs/store";
import { apiBaseUrl } from "../vars/variables";

type Props = {
	title: string;
	keywords: string;
	description: string;
};

export function Meta({ title, keywords, description }: Props) {
	const [pageCounter, setPageCounter] = useRecoilState(pageCounterState);
	const [portFilter, setPortFilter] = useRecoilState(portFilterState);
	const [countryFilter, setCountryFilter] = useRecoilState(countryFilterState);

	return (
		<Head>
			<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<link rel="icon" type="image/svg+xml" href="/logo.svg" sizes="any" />
			<link
				rel="preload"
				href={`${apiBaseUrl}/proxies/?format=json&is_active=true&location_country_code=${countryFilter}&port=${portFilter}&page=${pageCounter?.toString()}`}
				as="fetch"
				crossOrigin="anonymous"></link>
			<title>{title}</title>
		</Head>
	);
}

Meta.defaultProps = {
	title: "Shadowmere",
	keywords:
		"vpn, proxies, freedom of internet, community, productivity, shadowsocks, cuba, iran, india, china, servers, internet",
	description: "A list of Shadowsocks proxies to avoid censorship",
};
