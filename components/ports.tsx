import useSWR from "swr";
import React, { useEffect } from "react";
import { portFilterState, pageCounterState } from "../libs/store";
import { useRecoilState } from "recoil";
import { apiBaseUrl } from "../vars/variables";

export default function Ports(props: any) {
	const [portFilter, setPortFilter] = useRecoilState(portFilterState);
	const [pageFilter, setPageFilter] = useRecoilState(pageCounterState);


	const fetcher = (...args: [any, any]) =>
		fetch(...args).then((res) => res.json());

	const { data: ports, error } = useSWR(
		`${apiBaseUrl}/ports/`,
		fetcher
	);

	if (error) return <>Error</>;

	if (!ports)
		return (
			<div className="ports-filter flex flex-col gap-2 xl:gap-4">
				<label
					htmlFor="ports"
					className="w-full h-6 flex items-center font-semibold gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-anchor stroke-[#303030] dark:stroke-[#cfcfcf]"
						width={20}
						height={20}
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2"></path>
						<path d="M12 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
					</svg>
					Ports
				</label>
				<select
					title="Ports"
					name="ports"
					id="port-selection-skeleton"
					className="relative puertos form-select rounded-md overflow-scroll border-gray-300 mx-2 text-[#303030] dark:text-[#cfcfcf] dark:hover:bg-[#3a3a3a] dark:bg-[#303030] outline-none cursor-pointer border dark:border-[#3a3a3a] ">
					<option value="Any">Any</option>
				</select>
			</div>
		);

	const handleChange = (event: any) => {
		if (event.target.value === "Any") {
			setPortFilter("");
		} else {
			setPortFilter(event.target.value);
			setPageFilter(1);
		}
	};

	return (
		<div className="ports-filter flex flex-col gap-2 xl:gap-4">
			<label
				htmlFor="ports"
				className="w-full h-6 flex items-center font-semibold gap-2">
				<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-anchor stroke-[#303030] dark:stroke-[#cfcfcf]"
						width={20}
						height={20}
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2"></path>
						<path d="M12 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
					</svg>
				Ports
			</label>
			<select
				title="Ports"
				value={props.valuePort}
				name="ports"
				id="port-selection"
				onChange={handleChange}
				className="relative puertos form-select rounded-md overflow-scroll border-gray-300 hover:border-[#b1b1b1] mx-2 text-[#303030] dark:text-[#cfcfcf] dark:hover:bg-[#3a3a3a] dark:bg-[#303030] outline-none cursor-pointer border dark:border-[#3a3a3a] transition-all">
				<option value="Any" defaultValue={"Any"}>
					Any
				</option>
				{ports.map((port: any, i: number) => (
					<option key={i} id="opcion">
						{port.port}
					</option>
				))}
			</select>
		</div>
	);
}
