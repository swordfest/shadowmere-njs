import useSWR from "swr"
import Ports from "./ports"
import Countries from "./countries"
import { pageCounterState, portFilterState, countryFilterState } from "./store"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Proxies } from "./data"
import { parseISO } from "date-fns/esm"


export default function Sidebar(props: any) {
    const [pageCounter, setPageCounter] = useRecoilState(pageCounterState);
    const [portFilter, setPortFilter] = useRecoilState(portFilterState);
    const [countryFilter, setCountryFilter] = useRecoilState(countryFilterState);
    // const proxies: Proxies = useRecoilValue(proxiesObj)
    const [proxies, setProxies] = useState<Proxies>()
    const [time, setTime] = useState('')


    const handleClick = (event: any) => {
        setPageCounter(1)
        setPortFilter('')
        setCountryFilter('')
        // console.log(props.data)
    }

    const resetCountry = () => {
        return 'UN'
    }

    useEffect(()=>{
        if (props.data) {
            setProxies(props.data)
            // setTime(proxies?.results[0].last_checked)
        }
    })

    return (
        <div className="sidebar col-span-12 xl:col-span-3 w-auto h-fit 2xl:h-fit mb-4 bg-white dark:bg-[#212121] dark:text-[#cfcfcf] shadow-lg flex flex-col xl:flex-col gap-6 p-4 rounded-lg">
            <div className="online-vpns-filter flex flex-col gap-2 xl:gap-4">
                <div className="w-full h-6 flex items-center font-semibold gap-2">
                    <svg className="fill-[#303030] dark:fill-[#cfcfcf]" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5416 8.83333C10.1983 7.85874 9.56104 7.01469 8.71771 6.41764C7.87437 5.82059 6.86654 5.49996 5.83325 5.5C3.07492 5.5 0.833252 7.74167 0.833252 10.5C0.833252 13.2583 3.07492 15.5 5.83325 15.5C6.86654 15.5 7.87437 15.1794 8.71771 14.5824C9.56104 13.9853 10.1983 13.1413 10.5416 12.1667H14.1666V15.5H17.4999V12.1667H19.1666V8.83333H10.5416ZM5.83325 12.1667C4.91658 12.1667 4.16658 11.4167 4.16658 10.5C4.16658 9.58333 4.91658 8.83333 5.83325 8.83333C6.74992 8.83333 7.49992 9.58333 7.49992 10.5C7.49992 11.4167 6.74992 12.1667 5.83325 12.1667Z"/>
                    </svg> 
                    Online VPNs
                </div>
                <div className="w-full h-6 flex items-center font-semibold gap-2 pl-4">
                    <svg className="fill-[#303030] dark:fill-[#cfcfcf]" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.25 4.25H0.75C0.335789 4.25 0 3.91421 0 3.5V2C0 1.58579 0.335789 1.25 0.75 1.25H11.25C11.6642 1.25 12 1.58579 12 2V3.5C12 3.91421 11.6642 4.25 11.25 4.25ZM10.125 2.1875C9.81434 2.1875 9.5625 2.43934 9.5625 2.75C9.5625 3.06066 9.81434 3.3125 10.125 3.3125C10.4357 3.3125 10.6875 3.06066 10.6875 2.75C10.6875 2.43934 10.4357 2.1875 10.125 2.1875ZM8.625 2.1875C8.31434 2.1875 8.0625 2.43934 8.0625 2.75C8.0625 3.06066 8.31434 3.3125 8.625 3.3125C8.93566 3.3125 9.1875 3.06066 9.1875 2.75C9.1875 2.43934 8.93566 2.1875 8.625 2.1875ZM11.25 8H0.75C0.335789 8 0 7.66421 0 7.25V5.75C0 5.33579 0.335789 5 0.75 5H11.25C11.6642 5 12 5.33579 12 5.75V7.25C12 7.66421 11.6642 8 11.25 8ZM10.125 5.9375C9.81434 5.9375 9.5625 6.18934 9.5625 6.5C9.5625 6.81066 9.81434 7.0625 10.125 7.0625C10.4357 7.0625 10.6875 6.81066 10.6875 6.5C10.6875 6.18934 10.4357 5.9375 10.125 5.9375ZM8.625 5.9375C8.31434 5.9375 8.0625 6.18934 8.0625 6.5C8.0625 6.81066 8.31434 7.0625 8.625 7.0625C8.93566 7.0625 9.1875 6.81066 9.1875 6.5C9.1875 6.18934 8.93566 5.9375 8.625 5.9375ZM11.25 11.75H0.75C0.335789 11.75 0 11.4142 0 11V9.5C0 9.08579 0.335789 8.75 0.75 8.75H11.25C11.6642 8.75 12 9.08579 12 9.5V11C12 11.4142 11.6642 11.75 11.25 11.75ZM10.125 9.6875C9.81434 9.6875 9.5625 9.93934 9.5625 10.25C9.5625 10.5607 9.81434 10.8125 10.125 10.8125C10.4357 10.8125 10.6875 10.5607 10.6875 10.25C10.6875 9.93934 10.4357 9.6875 10.125 9.6875ZM8.625 9.6875C8.31434 9.6875 8.0625 9.93934 8.0625 10.25C8.0625 10.5607 8.31434 10.8125 8.625 10.8125C8.93566 10.8125 9.1875 10.5607 9.1875 10.25C9.1875 9.93934 8.93566 9.6875 8.625 9.6875Z"/>
                        </svg> 
                    <span className="font-normal" >{proxies?.count}</span>
                </div>
            </div>

            <div className="last-check-filter flex flex-col gap-2 xl:gap-4">
                <div className="w-full h-6 flex items-center font-semibold gap-2">
                    <svg className="fill-[#303030] dark:fill-[#cfcfcf]" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.0621 12.2361C18.0621 12.2723 18.0585 12.2976 18.0513 12.3121C17.5883 14.2507 16.619 15.8223 15.1433 17.0267C13.6676 18.2311 11.9387 18.8333 9.95668 18.8333C8.90054 18.8333 7.87877 18.6344 6.89136 18.2366C5.90394 17.8387 5.02323 17.2708 4.24921 16.533L2.84947 17.9327C2.71203 18.0702 2.54927 18.1389 2.36119 18.1389C2.17311 18.1389 2.01035 18.0702 1.87291 17.9327C1.73547 17.7953 1.66675 17.6325 1.66675 17.4445V12.5833C1.66675 12.3953 1.73547 12.2325 1.87291 12.0951C2.01035 11.9576 2.17311 11.8889 2.36119 11.8889H7.2223C7.41038 11.8889 7.57314 11.9576 7.71059 12.0951C7.84803 12.2325 7.91675 12.3953 7.91675 12.5833C7.91675 12.7714 7.84803 12.9342 7.71059 13.0716L6.22404 14.5582C6.73764 15.0356 7.31996 15.4045 7.971 15.6649C8.62204 15.9254 9.2984 16.0556 10.0001 16.0556C10.9694 16.0556 11.8736 15.8205 12.7128 15.3503C13.5519 14.8801 14.2246 14.2326 14.731 13.408C14.8106 13.285 15.0023 12.8618 15.3061 12.1385C15.3639 11.9721 15.4724 11.8889 15.6316 11.8889H17.7149C17.809 11.8889 17.8903 11.9233 17.9591 11.992C18.0278 12.0607 18.0621 12.1421 18.0621 12.2361ZM18.3334 3.55556V8.41667C18.3334 8.60475 18.2647 8.76751 18.1273 8.90495C17.9898 9.0424 17.827 9.11112 17.639 9.11112H12.7779C12.5898 9.11112 12.427 9.0424 12.2896 8.90495C12.1521 8.76751 12.0834 8.60475 12.0834 8.41667C12.0834 8.22859 12.1521 8.06583 12.2896 7.92839L13.787 6.43099C12.7164 5.43996 11.4541 4.94445 10.0001 4.94445C9.03075 4.94445 8.12653 5.17955 7.28741 5.64974C6.44829 6.11994 5.77554 6.76737 5.26918 7.59202C5.18961 7.71499 4.99791 8.13817 4.69409 8.86155C4.63622 9.02793 4.52771 9.11112 4.36857 9.11112H2.20928C2.11524 9.11112 2.03386 9.07676 1.96514 9.00803C1.89642 8.93931 1.86206 8.85793 1.86206 8.76389V8.68794C2.33226 6.74928 3.30882 5.17774 4.79175 3.97331C6.27468 2.76889 8.01079 2.16667 10.0001 2.16667C11.0562 2.16667 12.0834 2.36741 13.0817 2.76889C14.0799 3.17036 14.9661 3.73641 15.7401 4.46702L17.1507 3.06728C17.2881 2.92984 17.4509 2.86112 17.639 2.86112C17.827 2.86112 17.9898 2.92984 18.1273 3.06728C18.2647 3.20472 18.3334 3.36748 18.3334 3.55556Z"/>
                        </svg> 
                        Last check
                </div>
                <div className="w-full h-6 flex items-center font-semibold gap-2 pl-4">
                    {/* <span className="font-normal">{format(new Date(time), 'MMMM do yyyy, h:mm:ss a')}</span> */}
                    <span className="font-normal">{props.time}</span>
                </div>
            </div>

            <Ports valuePort={portFilter}/>

            <Countries valueCountry={countryFilter}/> 

            <button onClick={handleClick} className="button-reset w-auto h-12 flex items-center justify-center px-5 rounded-md bg-[#212121] hover:bg-[#444444] active:bg-[#303030] dark:bg-[#cfcfcf] dark:hover:bg-[#bfbfbf] dark:active:bg-white dark:transition-colors text-white">
                <svg className="dark:fill-[#303030] fill-[#cfcfcf]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path><path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path></svg>
                <span className="dark:text-[#303030] font-medium">Reset Filters</span>
            </button>
        </div>
    )
}