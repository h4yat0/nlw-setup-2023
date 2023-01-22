import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Text } from "react-native";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export function New() {
	const [weekDays, setWeekDays] = useState<number[]>([]);

	function handleToggleWeekDay(weekDayIndex: number) {
		if (weekDays.includes(weekDayIndex)) {
			setWeekDays((prevState) =>
				prevState.filter((weekDay) => weekDay !== weekDayIndex)
			);
		} else {
			setWeekDays((prevState) => [...prevState, weekDayIndex]);
		}
	}

	const availableWeekDays = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	];
	return (
		<View className='flex-1 bg-background px-8 pt-16'>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				<BackButton />
				<Text className='mt-6 text-white font-extrabold text-3xl'>
					Criar Hábito
				</Text>
				<Text className='mt-6 text-white font-semibold text-base'>
					Qual seu comprometimento?
				</Text>
				<TextInput
					className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
					placeholder='ex: Beber 2 litros de água, Dormir bem, etc'
					placeholderTextColor={colors.zinc[400]}
				/>
				<Text className='mt-4 mb-3 text-white font-semibold text-base'>
					Qual a recorrência
				</Text>
				{availableWeekDays.map((weekDay, i) => (
					<CheckBox
						key={weekDay}
						title={weekDay}
						checked={weekDays.includes(i)}
						onPress={() => handleToggleWeekDay(i)}
					/>
				))}

				<TouchableOpacity
					className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
					activeOpacity={0.7}
				>
					<Feather name='check' size={20} color={colors.white} />
					<Text className='font-semibold text-base text-white ml-2'>
						Conffirmar
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}