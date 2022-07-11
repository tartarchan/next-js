import Image from "next/image";
import normal_ops from "@/public/images/misc/normal_ops.png";
import boss from "@/public/images/misc/boss.png";
import encount from "@/public/images/misc/encount.png";
import emergency_ops from "@/public/images/misc/emergency_ops.png";
import Link from "next/link";
import { FLOOR_ROMAN_NUMERALS } from "./Floor_title";
import { useState, useEffect } from "react";
import { LeftArrowSVG } from "../svg";

const normalOps = (
	<Image
		src={normal_ops}
		width={"100px"}
		height={"42px"}
		alt="combat"
		layout="fixed"
	/>
);
const emergencyOps = (
	<Image
		src={emergency_ops}
		width={"100px"}
		height={"42px"}
		alt="emergency operation"
		layout="fixed"
	/>
);
const bossStage = (
	<Image src={boss} width={"100px"} height={"42px"} alt="boss" layout="fixed" />
);
const encountStage = (
	<Image
		src={encount}
		width={"100px"}
		height={"42px"}
		alt="encount"
		layout="fixed"
	/>
);

export default function FloorNavigation({ stagesList, floor }) {
	const FLOORS = [1, 2, 3, 4, 5, 6];
	const [selectedFloor, setSelectedFloor] = useState(floor);

	const stages = stagesList.map(({ params }) => {
		const { name } = params;
		const stage = require(`../../stages/is/${name}.json`);
		return { name, floors: stage.floors };
	});
	const allEncounterStages = stages.filter(({ name }) =>
		name.includes("ISW-SP")
	);
	const allDuckStages = stages.filter(({ name }) => name.includes("ISW-DU"));
	const allBossStages = stages.filter(({ name }) => name.includes("ISW-DF"));
	const allNormalStages = stages.filter(({ name }) => name.includes("ISW-NO"));

	const IndivFloorNavigation = ({ floor, selectedFloor }) => {
		const floorNormalStages = getStageLink(allNormalStages, floor);
		const floorEncounterStages = getStageLink(allEncounterStages, floor);

		const floorBossStages = getStageLink(allBossStages, floor);
		const floorDuckStages = getStageLink(allDuckStages, floor);

		return (
			<div
				className={`grid auto-rows-auto ${
					selectedFloor === floor ? "" : "hidden"
				}`}
			>
				<div className="grid grid-cols-[100px_480px] items-center">
					<div className="h-[68px] flex items-center">{normalOps}</div>
					<div className="flex flex-wrap-reverse justify-center items-center mb-1">
						{floorNormalStages}
					</div>
				</div>
				{(floorDuckStages.length > 0 || floorEncounterStages.length > 0) && (
					<div className="grid grid-cols-[100px_480px] items-center">
						<div className="h-[68px] flex items-center">{encountStage}</div>
						<div className="flex items-center justify-center mb-1">
							{floorDuckStages}
							{floorEncounterStages}
						</div>
					</div>
				)}
				{floorBossStages.length > 0 && (
					<div className="grid grid-cols-[100px_480px] items-center">
						<div className="h-[68px] flex items-center">{bossStage}</div>
						<div className="flex items-center justify-center mb-1">
							{" "}
							{floorBossStages}
						</div>
					</div>
				)}
			</div>
		);
	};

	useEffect(() => {
		setSelectedFloor(floor);
	}, [floor]);

	return (
		<div className="grid grid-cols-[35px_auto_35px] items-center w-full md:w-max md:-translate-x-[55px] mt-16 mx-auto select-none shadow-lg">
			<div></div>

			<div className="grid grid-cols-[100px_auto]">
				<div></div>
				<p className="text-center text-lg font-medium shadow-lg mb-1 ">
					{FLOOR_ROMAN_NUMERALS[selectedFloor - 1]}
				</p>
			</div>
			<div></div>
			<div
				className={`${selectedFloor > 1 ? "hover:cursor-pointer hover:bg-neutral-700" : "brightness-50"} w-[35px] h-full flex items-center justify-center shadow-lg`}
				onClick={() => {
					if (selectedFloor > 1) setSelectedFloor(selectedFloor - 1);
				}}
			>
				<LeftArrowSVG />
			</div>

			{FLOORS.map((floor) => {
				return (
					<IndivFloorNavigation
						key={"floor" + floor}
						selectedFloor={selectedFloor}
						floor={floor}
					/>
				);
			})}
			<div
				className={`${selectedFloor < 6 ? "hover:cursor-pointer hover:bg-neutral-700" : "brightness-50"} w-[35px] h-full flex items-center justify-center shadow-lg`}
				onClick={() => {
					if (selectedFloor < 6) setSelectedFloor(selectedFloor + 1);
				}}
			>
				<LeftArrowSVG className="h-6 w-6 rotate-180" />
			</div>
		</div>
	);
}

const getStageLink = (stages, floor) => {
	return stages
		.filter(({ floors }) => floors.includes(floor))
		.map(({ name }) => (
			<Link href={name} key={name}>
				<div className="hover:text-sky-400 w-[100px]  h-full mx-2 my-1 text-center hover:cursor-pointer">
					<span>{name.slice(7)}</span>
				</div>
			</Link>
		));
};
