import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface HabitParams {
	date: string;
}
export function Habit() {
	const route = useRoute();

	const { date } = route.params as HabitParams;
	const parseDate = dayjs();

	const dayOfWeek = parseDate.format("dddd");
	const dayAndMounth = parseDate.format("DD/MM");

	// const [weekDays, setWeekDays] = useState<number[]>([]);

	// function handleToggleWeekDay(weekDayIndex: number) {
	// 	if (weekDays.includes(weekDayIndex)) {
	// 		setWeekDays((prevState) =>
	// 			prevState.filter((weekDay) => weekDay !== weekDayIndex)
	// 		);
	// 	} else {
	// 		setWeekDays((prevState) => [...prevState, weekDayIndex]);
	// 	}
	// }

	// const availableWeekDays = [
	// 	"Domingo",
	// 	"Segunda-feira",
	// 	"Terça-feira",
	// 	"Quarta-feira",
	// 	"Quinta-feira",
	// 	"Sexta-feira",
	// 	"Sábado",
	// ];

	return (
		<View className='flex-1 bg-background px-8 pt-16'>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				<BackButton />

				<Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
					{dayOfWeek}
				</Text>
				<Text className='text-white font-extrabold text-3xl'>
					{dayAndMounth}
				</Text>
				<ProgressBar progress={56} />

				<View className='mt-6'>
					<CheckBox
						title='Beber 2 litros de água'
						checked={false}
						// onPress={() => handleToggleWeekDay()}
					/>
				</View>
			</ScrollView>
		</View>
	);
}
