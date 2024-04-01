import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { getFlagEmoji, getPercentage } from "../libs/functions";
import { countryFilterState, pageCounterState } from "../libs/store";
import { useRecoilState } from "recoil";
import { apiBaseUrl } from "../vars/variables";

export default function Countries(props: any) {
	const [country, setCountry] = useRecoilState(countryFilterState);
	const [pageFilter, setPageFilter] = useRecoilState(pageCounterState);


	const fetcher = (...args: [any, any]) =>
		fetch(...args).then((res) => res.json());

	const { data: countries, error } = useSWR(
		`${apiBaseUrl}/country-codes`,
		fetcher
	);

	if (error) return <>Error</>;

	if (!countries)
		return (
			<div className="countries-filter flex flex-col gap-2 xl:gap-4">
				<div className="w-full h-6 flex items-center font-semibold gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-world-pin stroke-[#303030] dark:stroke-[#cfcfcf]"
						width={24}
						height={24}
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M20.972 11.291a9 9 0 1 0 -8.322 9.686"></path>
						<path d="M3.6 9h16.8"></path>
						<path d="M3.6 15h8.9"></path>
						<path d="M11.5 3a17 17 0 0 0 0 18"></path>
						<path d="M12.5 3a16.986 16.986 0 0 1 2.578 9.018"></path>
						<path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z"></path>
						<path d="M19 18v.01"></path>
					</svg>
					Countries
				</div>

				<select
					title="Countries"
					name="countries"
					id="component-placeholder"
					className="form-select font-twemoji rounded-md border-gray-300 mx-2 text-[#303030] dark:text-[#cfcfcf]  dark:hover:bg-[#3a3a3a] dark:bg-[#303030] outline-none cursor-pointer border dark:border-[#3a3a3a] transition-all">
					<option value="UN" className="font-twemoji">
						{getFlagEmoji("UN")} Worldwide
					</option>
				</select>
			</div>
		);

	const handleChange = (event: any) => {
		if (event.target.value === "UN") {
			setCountry("");
		} else {
			setCountry(event.target.value);
			setPageFilter(1);
		}
	};

	// useEffect(() => {

	// }, [])

	return (
		<div className="countries-filter flex flex-col gap-2 xl:gap-4">
			<label
				htmlFor="countries"
				className="w-full h-6 flex items-center font-semibold gap-2">
				<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-world-pin stroke-[#303030] dark:stroke-[#cfcfcf]"
						width={20}
						height={20}
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M20.972 11.291a9 9 0 1 0 -8.322 9.686"></path>
						<path d="M3.6 9h16.8"></path>
						<path d="M3.6 15h8.9"></path>
						<path d="M11.5 3a17 17 0 0 0 0 18"></path>
						<path d="M12.5 3a16.986 16.986 0 0 1 2.578 9.018"></path>
						<path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z"></path>
						<path d="M19 18v.01"></path>
					</svg>
				Countries
			</label>

			<select
				title="Countries"
				name="countries"
				id="countries-selection"
				value={props.valueCountry}
				onChange={handleChange}
				className="form-select font-twemoji rounded-md border-gray-300 mx-2 text-[#303030] hover:border-[#b1b1b1] dark:text-[#cfcfcf]  dark:hover:bg-[#3a3a3a] dark:bg-[#303030] outline-none cursor-pointer border dark:border-[#3a3a3a] transition-all">
				<option value="UN" className="font-twemoji">
					{getFlagEmoji("UN")} Worldwide
				</option>
				{countries.map((country: any, i: number) => (
					<option key={i} value={country.code} className="font-twemoji">
						{getFlagEmoji(country.code)} {country.name}
					</option>
				))}
			</select>
		</div>
	);
}
