import { IconCheck, IconClipboardCopy } from "@tabler/icons-react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { apiBaseUrl } from "../vars/variables";


export default function ItemSubscriptionV2Ray(props: any) {
  const [isOver, setIsOver] = useState(false);
  const [timeCopy, setTimeCopy] = useState(false);


  const handleOver = () => {
    setIsOver(true);
  };
  const handleLeave = () => {
    setIsOver(false);
  };
  const handleClick = () => {
    setIsOver(false);
    setTimeCopy(true);

    navigator.clipboard
      .writeText(`${apiBaseUrl}/b64sub/`)
      .then(() => {
        setTimeout(() => {
          setTimeCopy(false);
          if (!isOver) {
            setIsOver(true);
          }
        }, 2000);
      })
      .catch(() => {
        alert("something went wrong");
      });
  };

  return (
    <div
      data-umami-event={"v2ray"}
      className={`itemSub w-full h-full mb-4 bg-white dark:bg-[#212121] dark:text-white flex items-center gap-2
                 p-4 rounded-lg border border-[#e0e0e0] dark:border-[#303030] hover:border-[#3a3a3a] cursor-pointer item-server-vpn after:blur-3xl backdrop-blur-sm overflow-hidden transition-all `}
      onMouseEnter={handleOver}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <div className="icon-server w-8 h-8 flex shrink-0 rounded bg-[#303030] items-center justify-center">
        {!isOver ? (
          !timeCopy ? (
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.88672 4.5H6.72763L11.6026 17.5L17.364 4.5"
                stroke="#cfcfcf"
                stroke-linecap="round"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <IconCheck
              className={`transition-all duration-100 ease-in-out stroke-[#cfcfcf] dark:stroke-[#303030]`}
            />
          )
        ) : (
          <IconClipboardCopy
            className={`transition-all duration-100 ease-in-out stroke-[#cfcfcf] dark:stroke-[#303030]`}
          />
        )}
      </div>
      <div className={`flex flex-col `}>
        {!timeCopy && (
          <span className="dark:text-[#cfcfcf] text-sm capitalize pointer-events-none">
            V2Ray subscription
          </span>
        )}
        {timeCopy && (
          <span className="dark:text-[#cfcfcf] text-md capitalize leading-4 pointer-events-none">
            Copied to Clipboard!
          </span>
        )}
        {/* <span className={`text-[#494949] text-sm capitalize ${!isOver && 'hidden'}`}>Copy</span> */}
      </div>
    </div>
  );
}
