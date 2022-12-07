import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Content from "../components/content";
import Head from "next/head";

export default function About() {
	return (
		<>
			<Head>
				<title>About Us</title>
				<meta charSet="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg+xml" href="/logo.svg" sizes="any" />
			</Head>
			<Navbar active={"about"} />
			<main className="wrapper container mx-auto w-full h-full xl:h-full grid grid-cols-12 auto-rows-auto mb-16 2xl:mb-0 mt-20 py-6 xl:py-8 gap-[30px] px-4 pb-4">
				<Sidebar />
				<div className="contenido-about col-span-12 xl:col-span-9 w-full h-fit bg-white dark:bg-[#212121] dark:text-[#cfcfcf] rounded-lg shadow-lg flex flex-col gap-6 p-8 mb-4 2xl:mb-40">
					<h1 className="text-2xl font-bold">About Us</h1>
					{/* <!-- Aqui va el contenido del About --> */}
					<p>Shadowmere. A list of Shadowsocks proxies</p>
					<h2 className="font-bold">Disclaimer.</h2>
					<p>
						This website is only a list of tunnels collected all around
						internet. We do NOT provide or maintain any of these tunnels.{" "}
						<span className="bg-red-600 text-white">
							Use them at your own risk.
						</span>
					</p>
					<h2 className="font-bold">How do I use this?</h2>
					<p>
						Go give{" "}
						<a
							href="https://www.shadowsocks.org"
							className="text-[#579eff] font-bold after:content-['\f08e'] hover:text-[#467ecc] transition-colors after:pl-1 after:font-awesome after:text-sm">
							Shadowsocks
						</a>{" "}
						a quick look for information. Here is a list of clients for several
						platforms, but my favorite is{" "}
						<a
							href="https://getoutline.org/"
							className="text-[#579eff] font-bold after:content-['\f08e'] hover:text-[#467ecc] transition-colors after:pl-1 after:font-awesome after:text-sm">
							Outline
						</a>{" "}
						for any platform and{" "}
						<a
							href="https://play.google.com/store/apps/details?id=com.github.shadowsocks"
							className="text-[#579eff] font-bold after:content-['\f08e'] hover:text-[#467ecc] transition-colors after:pl-1 after:font-awesome after:text-sm">
							Shadowsocks for Android
						</a>
					</p>
				</div>
			</main>
		</>
	);
}
