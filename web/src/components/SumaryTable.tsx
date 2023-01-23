import { HabitDay } from "./HabitDay";
import { GenerateDatesFromYearBegning } from "../utils/generate-dates-from-year-begning";
import { useEffect, useState } from "react";
import { AppWindow } from "phosphor-react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const sumaryDates = GenerateDatesFromYearBegning();

const minimunSumaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimunSumaryDatesSize - sumaryDates.length;

type Summary = Array<{
	id: string;
	date: string;
	amount: number;
	completed: number;
}>;

export function SumaryTable() {
	const [summary, setSummary] = useState<Summary>([]);

	useEffect(() => {
		api.get("summary").then((reponse) => {
			setSummary(reponse.data);
		});
	}, []);
	return (
		<div className='w-full flex'>
			<div className='grid grid-rows-7 grid-flow-row gap-3'>
				{weekDays.map((weekDay, i) => {
					return (
						<div
							key={`${weekDay}-${i}`}
							className='text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center'
						>
							{weekDay}
						</div>
					);
				})}
			</div>
			<div className='grid grid-rows-7 grid-flow-col gap-3'>
				{sumaryDates.map((date) => {
					const dayInSummary = summary.find((day) => {
						return dayjs(date).isSame(day.date, "day");
					});

					return (
						<HabitDay
							key={date.toString()}
							date={date}
							amount={dayInSummary?.amount}
							completed={dayInSummary?.completed}
						/>
					);
				})}

				{amountOfDaysToFill > 0 &&
					Array.from({ length: amountOfDaysToFill }).map((_, i) => {
						return (
							<div
								key={i}
								className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'
							/>
						);
					})}
			</div>
		</div>
	);
}
