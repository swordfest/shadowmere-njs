import { getFlagEmoji, getPercentage } from './functions';
import React, {useEffect, useState} from 'react';
import { proxyId, qrScreen } from './store';
import { useRecoilState } from 'recoil';

export default function Server (dataServer:{proxy: any}) {
    const [timeCopy, setTimeCopy] = useState(false)
    const [proxID, setProxID] = useRecoilState(proxyId)
    const [qrActive, setQrActive] = useRecoilState(qrScreen)

    const handleQR = () => {
        setProxID(dataServer.proxy.id)
        setQrActive(!qrActive)
    }

    return (
        <div className="item-server-vpn w-full h-24 sm:h-28 bg-white dark:bg-[#212121] dark:text-[#cfcfcf] rounded-lg shrink-0 flex items-center justify-between px-4 py-2 md:py-4 shadow-lg hover:cursor-pointer hover:-translate-y-[2px] dark:hover:bg-[#303030] hover:bg-[#FDFDFD] transition-all ">

            <div className="data-country-ip gap-1 flex flex-col items-start justify-center">
                <div className="w-auto h-auto flex gap-2 items-center">
                    <div className="country-flag font-twemoji select-none flex items-center text-3xl sm:text-4xl w-auto h-6 cursor-pointer">{getFlagEmoji(dataServer.proxy.location_country_code)}</div>
                    <div className="nombre-ip w-auto h-auto flex flex-col ">
                        <span className=" leading-[1.10rem] font-semibold w-auto overflow-hidden truncate text-[14px] sm:text-[16px] ">{dataServer.proxy.location_country}</span>
                        <span className=" leading-[1.10rem] font-medium w-auto overflow-hidden truncate text-[14px] text-[#7e7d7d] sm:text-[16px] ">{dataServer.proxy.ip_address}</span>
                    </div>
                </div>

                <div className=" w-auto h-auto flex gap-2">
                    <div className=" hidden relative w-11 h-6 flex items-center justify-start select-none bg-[#cfcfcf] font-medium text-xs sm:text-sm rounded overflow-hidden">
                        <div className="w-full h-full"></div>
                        <span className="absolute w-12 h-6 z-10 text-[#303030] flex items-center justify-center px-2">aasdasdasd</span>
                    </div>

                    <div className={("w-14 h-6 before:content-[''] before:absolute before:rounded flex gap-1 items-center justify-start select-none bg-[#cfcfcf] font-medium text-xs sm:text-sm rounded overflow-visible ") + (((getPercentage(dataServer.proxy.times_check_succeeded, dataServer.proxy.times_checked) <= 79) && (getPercentage(dataServer.proxy.times_check_succeeded, dataServer.proxy.times_checked) > 30) && 'before:w-7 before:h-6 before:bg-yellow-500') || ((getPercentage(dataServer.proxy.times_check_succeeded, dataServer.proxy.times_checked) > 79) && 'before:w-14 before:h-6 before:bg-green-500') || ((getPercentage(dataServer.proxy.times_check_succeeded, dataServer.proxy.times_checked) <= 30) && 'before:w-4 before:h-6 before:bg-red-500'))} >
                        <div className="w-full h-full flex items-center justify-center z-10 gap-0.5 ">
                            <svg className=" fill-white" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2111_1115)">
                                    <path d="M3.44994 0.224375C3.46898 0.15958 3.50851 0.102699 3.56259 0.06225C3.61667 0.0218008 3.6824 -3.94915e-05 3.74994 5.36073e-08H6.24994C6.29943 3.7621e-05 6.3482 0.0118287 6.39224 0.0344027C6.43628 0.0569767 6.47433 0.0896881 6.50326 0.129844C6.53219 0.17 6.55116 0.216451 6.55863 0.265375C6.56609 0.314299 6.56183 0.364296 6.54619 0.41125L5.43369 3.75H7.81244C7.87096 3.74996 7.92832 3.76635 7.97798 3.79731C8.02764 3.82827 8.06761 3.87255 8.09334 3.92512C8.11906 3.97768 8.12952 4.03641 8.1235 4.09462C8.11748 4.15283 8.09525 4.20818 8.05931 4.25437L3.68431 9.87937C3.6395 9.93728 3.57577 9.9776 3.50425 9.99331C3.43274 10.009 3.35797 9.99913 3.29301 9.96534C3.22805 9.93156 3.17701 9.87604 3.14881 9.80847C3.1206 9.7409 3.11702 9.66557 3.13869 9.59562L4.26431 5.9375H2.18744C2.13885 5.93753 2.09093 5.92623 2.04748 5.9045C2.00403 5.88277 1.96624 5.8512 1.93712 5.81231C1.90799 5.77342 1.88834 5.72828 1.87972 5.68047C1.87109 5.63265 1.87374 5.58349 1.88744 5.53687L3.44994 0.224375Z" fill="#303030" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2111_1115">
                                        <rect width="10" height="10" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <span className="w-auto h-6 text-[#303030] flex items-center justify-center">{getPercentage(dataServer.proxy.times_check_succeeded, dataServer.proxy.times_checked).toString() + '%'}</span>

                        </div>
                    </div>

                    <div className="w-16 h-6 before:content-[''] before:absolute before:rounded before:w-16 before:h-6 before:bg-[#7474FF] flex gap-1 items-center justify-start select-none bg-[#cfcfcf] font-medium text-xs sm:text-sm rounded overflow-visible" >
                        <div className="w-full h-full flex items-center justify-center z-10 gap-0.5 ">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 7.5L9.5 5.5L8 7.5H8.953C8.735 8.7345 7.734 9.7355 6.5 9.953V6.5H7.5V5.5H6.5V4.668C7.2715 4.4385 7.857 3.7065 7.857 2.8575C7.857 1.833 7.024 1 6 1C4.976 1 4.143 1.833 4.143 2.8575C4.143 3.7065 4.7285 4.4385 5.5 4.668V5.5H4.5V6.5H5.5V9.953C4.2655 9.7355 3.2645 8.7345 3.047 7.5H4L2.5 5.5L1 7.5H2.0365C2.292 9.4425 4.001 11 6 11C7.999 11 9.708 9.4425 9.9635 7.5H11ZM5.143 2.8575C5.143 2.385 5.5275 2 6 2C6.4725 2 6.857 2.385 6.857 2.8575C6.857 3.333 6.4565 3.75 6 3.75C5.5435 3.75 5.143 3.333 5.143 2.8575Z" fill="white" />
                            </svg>
                            <span className="w-auto h-6 text-white text-xs sm:text-sm font-semibold flex items-center justify-center overflow-hidden">{dataServer.proxy.port}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="data-operations gap-4 flex flex-row-reverse items-center" >     
                <button title="Copy" className="opt-copiar relative w-4 h-4 sm:w-10 sm:h-10 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#EBEBEB] dark:hover:bg-[#1B1B1B] active:bg-[#D7D7D7] dark:active:bg-[#111111] transition-all active:scale-[95%]" onClick={() => {navigator.clipboard.writeText(dataServer.proxy.url+'#'+encodeURI(dataServer.proxy.location)).then(()=>{setTimeCopy(true); setTimeout(() => { setTimeCopy(false) }, 500)}).catch(() => {alert("something went wrong");}) }}>
                    <div className={("absolute w-4 h-4 sm:w-10 sm:h-10 rounded-md flex items-center justify-center ") + (timeCopy ? '': 'hidden')}>
                        <svg className=" bg-transparent w-6 h-6 stroke-[#303030] dark:stroke-[#cfcfcf]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 11.2L10.25 16L19 8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>                                
                    </div>
                    <svg className={("fill-[#303030] dark:fill-[#cfcfcf] ") + (!timeCopy ? '' : 'hidden')} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3.75V0H10.625C9.58945 0 8.75 0.839453 8.75 1.875V13.125C8.75 14.1605 9.58945 15 10.625 15H18.125C19.1605 15 20 14.1605 20 13.125V5H16.2852C15.5625 5 15 4.4375 15 3.75ZM16.25 0V3.75H20L16.25 0ZM7.5 13.75V5H1.875C0.839453 5 0 5.83945 0 6.875V18.125C0 19.1605 0.839453 20 1.875 20H9.375C10.4105 20 11.25 19.1605 11.25 18.125V16.25H10C8.62109 16.25 7.5 15.1289 7.5 13.75Z"/>
                            </svg> 
                </button>

                <button onClick={handleQR} title="QR Code" className="opt-codigo-qr w-4 h-4 sm:w-10 sm:h-10 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#EBEBEB] dark:hover:bg-[#1B1B1B] active:bg-[#D7D7D7] dark:active:bg-[#111111] transition-colors transition-transform active:scale-[95%]">
                    <svg className="fill-[#303030] dark:fill-[#cfcfcf] " width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_522_872)">
                        <path d="M0.25 8.75H7.75V1.25H0.25V8.75ZM2.75 3.75H5.25V6.25H2.75V3.75ZM10.25 1.25V8.75H17.75V1.25H10.25ZM15.25 6.25H12.75V3.75H15.25V6.25ZM0.25 18.75H7.75V11.25H0.25V18.75ZM2.75 13.75H5.25V16.25H2.75V13.75ZM16.5 11.25H17.75V16.25H14V15H12.75V18.75H10.25V11.25H14V12.5H16.5V11.25ZM16.5 17.5H17.75V18.75H16.5V17.5ZM14 17.5H15.25V18.75H14V17.5Z"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_522_872">
                        <rect width="17.5" height="20" fill="white" transform="translate(0.25)"/>
                        </clipPath>
                        </defs>
                        </svg>
                </button>

                {/* <a> */}
                <a href={'https://shadowmere.akiel.dev/' + dataServer.proxy.id + '/config'} title="Download" className="opt-descargar w-4 h-4 sm:w-10 sm:h-10 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#EBEBEB] dark:hover:bg-[#1B1B1B] active:bg-[#D7D7D7] dark:active:bg-[#111111] transition-colors transition-transform active:scale-[95%]">
                    <svg className="fill-[#303030] dark:fill-[#cfcfcf]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.75 13.75H13.5352L11.7676 15.5176C11.2969 15.9883 10.668 16.25 10 16.25C9.33203 16.25 8.70469 15.99 8.23242 15.5176L6.46484 13.75H1.25C0.559766 13.75 0 14.3098 0 15V18.75C0 19.4402 0.559766 20 1.25 20H18.75C19.4402 20 20 19.4402 20 18.75V15C20 14.3086 19.4414 13.75 18.75 13.75ZM16.875 17.8125C16.3594 17.8125 15.9375 17.3906 15.9375 16.875C15.9375 16.3594 16.3594 15.9375 16.875 15.9375C17.3906 15.9375 17.8125 16.3594 17.8125 16.875C17.8125 17.3906 17.3906 17.8125 16.875 17.8125ZM9.11719 14.6328C9.35938 14.8789 9.67969 15 10 15C10.3203 15 10.6398 14.8779 10.8836 14.6338L15.8836 9.63379C16.3715 9.14551 16.3715 8.35449 15.8836 7.86621C15.3953 7.37793 14.6039 7.37793 14.116 7.86621L11.25 10.7344V1.25C11.25 0.559766 10.6902 0 10 0C9.30859 0 8.75 0.559766 8.75 1.25V10.7344L5.88281 7.86719C5.39492 7.37891 4.60352 7.37891 4.11523 7.86719C3.62734 8.35547 3.62734 9.14648 4.11523 9.63477L9.11719 14.6328Z"/>
                            </svg>
                </a>
                {/* </a> */}    
            </div>
        </div>
        // <div>{dataServer.proxy.location_country}</div>
    )
}