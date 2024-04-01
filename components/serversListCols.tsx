import useSWR from "swr";
import React, { useState, useEffect } from "react";
// import Server from "./server";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  pageCounterState,
  portFilterState,
  countryFilterState,
  proxiesCount,
  proxiesObj,
  loaderPage,
} from "../libs/store";
import ServerSkeleton from "./serverSkeleton";
import ServerCol from "./serverCol";
import { apiBaseUrl } from "../vars/variables";

export default function ServersListCols(props: any) {
  const [pageCounter, setPageCounter] = useRecoilState(pageCounterState);
  const [portFilter, setPortFilter] = useRecoilState(portFilterState);
  const [countryFilter, setCountryFilter] = useRecoilState(countryFilterState);
  const [loader, setLoader] = useRecoilState(loaderPage);
  // const proxies = useRecoilValue(proxiesObj)
  const [skeleton, setSkeleton] = useState(Array(10));
  const [proxyCounter, setProxyCounter] = useRecoilState(proxiesCount);
  // const [data, setData] = useRecoilState<Proxies>(proxiesObj)
  const [noResults, setNoResults] = useState("No results has been found");

  const fetcher = (...args: [any, any]) =>
    fetch(...args).then((res) => res.json());
  const { data, error, mutate } = useSWR(
    `${apiBaseUrl}/proxies/?format=json&is_active=true&location_country_code=` +
      countryFilter +
      "&port=" +
      portFilter +
      "&page=" +
      pageCounter?.toString(),
    fetcher
  );

  useEffect(() => {
    if (data?.results.lenght == 0) setNoResults("There is no results");
  }, [data]);

  useEffect(() => {
    mutate();
    if (data) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [data, mutate, setLoader]);

  if (error)
    return (
      <div
        id="cuerpo"
        className="lista-servers-vpns col-span-12 xl:col-span-9 w-full h-screen flex flex-col items-center justify-center gap-4"
      >
        <span className=" dark:text-[#cfcfcf]">Error to load...</span>
      </div>
    );

  if (!data)
    return (
      <div
        id="cuerpo"
        className="lista-servers-vpns grid grid-cols-12 auto-rows-auto col-span-12 xl:col-span-9 w-full h-full gap-4"
      >
        <p className="dark:text-white col-span-12">
          <span className="font-bold dark:text-white">Disclaimer: </span>This
          website is only a list of tunnels collected all around internet. We do{" "}
          <span className="font-bold ">NOT</span> provide or maintain any of
          these tunnels.{" "}
          <span className="bg-red-600 text-white">
            Use them at your own risk.
          </span>
        </p>
        {skeleton.fill(0).map((skel: any, i: any) => (
          <ServerSkeleton key={i} />
        ))}
      </div>
    );

  if (data.count == 0) {
    return (
      <div
        id="cuerpo"
        className="lista-servers-vpns col-span-12 xl:col-span-9 w-full h-full flex flex-col gap-4"
      >
        <p className="dark:text-white">
          <span className="font-bold dark:text-white">Disclaimer: </span>This
          website is only a list of tunnels collected all around internet. We do{" "}
          <span className="font-bold ">NOT</span> provide or maintain any of
          these tunnels.{" "}
          <span className="bg-red-600 text-white">
            Use them at your own risk.
          </span>
        </p>
        <div className="w-full h-full flex flex-col items-center justify-center font-bold dark:text-white gap-6">
          <svg
            className="w-32 h-auto dark:fill-[#cfcfcf] mr-4"
            viewBox="0 0 44 43"
          >
            <path d="M14.9995 3.0373L17.1584 0L20.8061 0.133998L25.4365 0.312663L18.5877 2.70974L14.9995 3.0373Z" />
            <path d="M28.3269 10.46L27.9135 6.42433L32.7589 1.35236L30.4355 9.25196L28.3269 10.46Z" />
            <path d="M35.0241 18.7372L35.767 14.8334L42.7447 11.0674L38.3245 16.8097L35.0241 18.7372Z" />
            <path d="M37.9995 21L40.4115 21.5955L43.1212 26.4344L39.1459 23.3673L37.9995 21Z" />
            <path d="M40 32L41.6675 33.3102L42.6204 36.3624L40.8487 34.3673L40 32Z" />
            <path d="M6.30615 3.89836L5.31013 4.64349L6.23244 5.5991L4.9851 6.37778L5.67355 7.08147L2.48293 9.69583L6.89491 8.32793L7.13707 3.22467L5.7533 1.89141L6.30615 3.89836Z" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.082 10.9126L34.417 21.9004L37.3057 33.8857L22.4468 42.4766L20.1836 41.1367L19.4541 40.1689L17.7715 39.7073L13.022 36.8784L15.5679 29.3894L19.3052 24.0742L18.0098 19.9946L18.4268 23.9849L10.6396 27.1414L7.76611 30.0596L5.94971 30.387L4.71436 28.511L4.20801 28.4216L3.99951 27.3049L10.9375 12.3716L16.3125 8.02417L18.6499 6.1333L17.8906 9.61719L25.082 10.9126ZM14 19C15.1045 19 16 18.1045 16 17C16 15.8955 15.1045 15 14 15C12.8955 15 12 15.8955 12 17C12 18.1045 12.8955 19 14 19Z"
            />
            <circle cx="14.75" cy="16.75" r="0.75" />
          </svg>
          {noResults}
        </div>
      </div>
    );
  }

  return (
    <div
      id="cuerpo"
      className={`lista-servers-vpns col-span-12 xl:col-span-9 w-full h-full grid grid-cols-12 auto-rows-auto gap-[16px] `}
    >
      <p className="dark:text-white col-span-12">
        <span className="font-bold dark:text-white">Disclaimer: </span>This
        website is only a list of tunnels collected all around internet. We do{" "}
        <span className="font-bold ">NOT</span> provide or maintain any of these
        tunnels.{" "}
        <span className="bg-red-600 text-white">
          Use them at your own risk.
        </span>
      </p>
      {data.results?.map((d: any) => (
        <ServerCol key={d.id} proxy={d} />
      ))}
    </div>
  );
}
