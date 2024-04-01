import { useState } from "react";
import { useRecoilState } from "recoil";
import { apiBaseUrl } from "../vars/variables";

export default function V2raySubs() {
  const [copyLink, setCopyLink] = useState(false);


  return (
    <>
      <p>
        {"Some applications like "}
        <a
          href="https://play.google.com/store/apps/details?id=com.github.shadowsocks"
          className="text-[#579eff] font-bold after:content-['\f08e'] hover:text-[#467ecc] transition-colors after:pl-1 after:font-awesome after:text-sm"
        >
          V2Ray for Android
        </a>
        {` allow`} users to subscribe to a list of servers. You can subscribe to
        Shadowmere&apos;s using this link: 
        <span
          onClick={() => {
            navigator.clipboard.writeText(
              `${apiBaseUrl}/b64sub/`
            );
            setCopyLink(true);
            setTimeout(() => {
              setCopyLink(false);
            }, 1000);
          }}
          className=" group text-[#579eff] cursor-pointer font-bold hover:text-[#467ecc] transition-colors after:pl-1 dark:after:text-[#7a7a7a] after:text-[#c1c1c1] after:font-awesome after:text-sm "
        >
          https://shadowmere.akiel.dev/api/b64sub/ 
          <span
            className={
              "font-semibold text-[#c1c1c1] dark:text-[#7a7a7a] " +
              (copyLink ? "" : "hidden")
            }
          >
            Copied to Clipboard!
          </span>
          <span
            className={
              "font-awesome group:text-[#579eff] group:hover:text-[#467ecc] " +
              (!copyLink ? "" : "hidden")
            }
          >
            &#xf0c5;
          </span>
        </span>
      </p>
      <h2 className="font-bold">Tutorial video</h2>
      <iframe
        className="w-full h-[640px] rounded-lg"
        src="https://www.youtube.com/embed/YvQjOExb4no"
        title="Set up shadowsocks subscription from Shadowmere"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
}
