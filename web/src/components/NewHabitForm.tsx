import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
	"Domingo",
	"Segunda-feira",
	"Terça-feira",
	"Quarta-feira ",
	"Quinta-feira",
	"Sexta-feira",
	"Sábado",
];
export function NewHabitForm() {
	const [title, setTitle] = useState("");
	const [weekDays, setWeekdays] = useState<number[]>([]);

	async function createNewHabit(event: FormEvent) {
		event.preventDefault();

		if (!title || weekDays.length === 0) {
			console.log(title, weekDays.length);

			console.log("return");
			return;
		}

		await api.post("habits", {
			title,
			weekDays,
		});

		setTitle("");
		setWeekdays([]);

		alert("Hábito criado com sucesso");
	}

	function handleToggleWeekDay(weekDay: number) {
		if (weekDays.includes(weekDay)) {
			const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);

			setWeekdays(weekDaysWithRemovedOne);
		} else {
			const weekDaysWithAddedOne = [...weekDays, weekDay];
			setWeekdays(weekDaysWithAddedOne);
		}
	}

	return (
		<form onSubmit={createNewHabit} className='w-full flex flex-col mt-6'>
			<label htmlFor='title' className='font-semibold leading-tight'>
				Qual seu comprometimento?
			</label>
			<input
				type='text'
				id='title'
				placeholder='ex: Exercicíos, dormir bem'
				className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc400'
				autoFocus
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<label htmlFor='' className='font-semibold leading-tight mt-4'>
				Qual a recorrência?
			</label>
			<div className='flex flex-col gap-2 mt-3'>
				{availableWeekDays.map((weekDay, i) => (
					<Checkbox.Root
						key={weekDay}
						className='flex items-center gap-3 focus:outline-0 hover:outline-0 group'
						checked={weekDays.includes(i)}
						onCheckedChange={() => handleToggleWeekDay(i)}
					>
						<div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
							<Checkbox.Indicator>
								<Check size={20} className='text-white ' />
							</Checkbox.Indicator>
						</div>

						<span className=' text-white leading-tight '>{weekDay}</span>
					</Checkbox.Root>
				))}
			</div>
			<button
				type='submit'
				className='mt-6 rounded-lg p-4 flex items-center justify-center font-semibold bg-green-600  gap-3 hover:bg-green-500'
			>
				<Check size={20} weight='bold' />
				Confirmar
			</button>
		</form>
	);
}
