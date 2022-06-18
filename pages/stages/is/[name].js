import Layout from "@/components/layout";
import { getAllStageIds, getStageData } from "@/lib/stages";
import Head from "next/head";
import Map from "@/components/Map";
import EnemySimple from "@/components/EnemySimple";
import { useState } from "react";
import { useAppContext } from "context/AppContext";
import { TabComponent } from "@/components/Tabs";
import FooterBar from "@/components/IS/Footer_bar";

export async function getStaticProps({ params }) {
	const stageData = await getStageData(params.name, "is");
	return {
		props: {
			stageData,
		},
	};
}

export async function getStaticPaths() {
	const paths = getAllStageIds("is");
	// const locales = ["en", "jp"];
	// const paths = [];
	// for (const locale of locales) {
	//   allStages.forEach((ele) => {
	//     ele.locale = locale;
	//     paths.push(JSON.parse(JSON.stringify(ele)));
	//   });
	// }

	return {
		paths,
		fallback: false,
	};
}

export default function Stage({ stageData }) {
	// console.log(stageData);
	const { language, device } = useAppContext();
	const { mapConfig } = stageData;

	const fontThemes = { en: "font-sans", jp: "font-jp font-light" };

	const tabArr = [
		{
			key: "normal",
			title: "Normal",
			children: (
				<EnemySimple
					mapConfig={mapConfig}
					mode="normal"
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>
			),
		},
		{
			key: "hard",
			title: "Hard",
			children: (
				<EnemySimple
					mapConfig={mapConfig}
					mode="hard"
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>
			),
		},
	];

	return (
		<Layout banner={"phcs"}>
			<Head>
				<title>{mapConfig.name[language]}</title>
			</Head>
			<Map
				mapConfig={mapConfig}
				language={language}
				device={device}
				fontThemes={fontThemes}
			/>

			{mapConfig.hasOwnProperty("hard_mods") ? (
				<TabComponent tabArr={tabArr} />
			) : (
				<EnemySimple
					mapConfig={mapConfig}
					multiplier={multiplier}
					specialMods={specialMods}
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>
			)}
			<FooterBar />
		</Layout>
	);
}
