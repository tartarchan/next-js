import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { useAppContext } from "context/AppContext";

//images
import phcs_main_banner from "@/public/images/banners/phcs-main-banner.png";

export default function Home() {
	const { language, device } = useAppContext();
	const langPack = require(`../lang/${language}.json`);
	const dailyStages = [
		{ text: "炽热溶洞", link: "CC7_炽热溶洞_1" },
		{ text: "炽热溶洞", link: "CC7_炽热溶洞_1" },
		{ text: "风蚀高地", link: "CC7_风蚀高地_1" },
		{ text: "闭锁监狱", link: "CC7_闭锁监狱_1" },
		{ text: "遗弃地块", link: "CC7_遗弃地块_1" },
		{ text: "无序矿区", link: "CC7_无序矿区_1" },
		{ text: "八号竞技场", link: "CC7_八号竞技场_1" },
		{ text: "狂嚎沙原", link: "CC7_狂嚎沙原_1" },
		{ text: "风蚀高地", link: "CC7_风蚀高地_2" },
		{ text: "狂嚎沙原", link: "CC7_狂嚎沙原_2" },
		{ text: "遗弃地块", link: "CC7_遗弃地块_2" },
		{ text: "八号竞技场", link: "CC7_八号竞技场_2" },
		{ text: "无序矿区", link: "CC7_无序矿区_2" },
		{ text: "炽热溶洞", link: "CC7_炽热溶洞_2" },
	];

	const dailyCCArr = [];

	for (const [index, { text, link }] of dailyStages.entries()) {
		dailyCCArr.push(
			<>
				<div className="flex flex-wrap flex-col w-[25%] md:w-min" key={link}>
					<div className="border border-collapse border-gray-400 h-[25px] w-full md:w-[80px] text-base">
						{`6/${index + 8 + 1}`}
					</div>
					<Link href={`/stages/cc/${link}`}>
						<div
							className={`border border-collapse border-gray-400 ${
								language === "jp" ? "text-sm" : "text-xs"
							} hover:cursor-pointer hover:bg-gray-300 h-[40px] w-full md:w-[80px] underline text-blue-700`}
						>
							<p>{langPack[text]}</p>
						</div>
					</Link>
				</div>
			</>
		);
	}

	const getTheme = () => {
		return language === "en" ? "text-xs" : "";
	};

	const linesOfText = {
		jp: ["CC7お疲れ様でした！", "統合戦略のページは鋭意開発中！"],
		en: [
			"Hope you found this site useful for CC#7!",
			"See you back in July for the greatest treat of the year - ",
			"Phantom & Crimson Solitaire",
		],
	};

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<div
				id="home-container"
				className={`flex flex-col min-h-[80vh] place-content-center ${
					language === "jp" ? "font-jp" : "font-sans"
				}`}
			>
				<div id="main content" className="w-full md:min-w-10">
					<div className="relative shadow-2xl">
						<Image
							src={phcs_main_banner}
							layout="responsive"
							alt="phantom and crimson solitaire"
							className="brightness-[.15] "
						/>
					</div>
				</div>
				<div className="w-100vw ml-2 md:ml-0 md:w-[560px] mt-6 text-center">
					<ul>
						{linesOfText[language].map((line) => (
							<li key={line}>{line}</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>
	);
}
