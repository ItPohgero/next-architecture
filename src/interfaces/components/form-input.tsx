import { format } from "date-fns"
import { debounce } from "lodash";
import React, {
	type ReactNode,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	type Control,
	Controller,
	type ControllerRenderProps,
	type FieldErrors,
	type FieldPathValue,
	type FieldValues,
	type Path,
	type RegisterOptions,
} from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

export type OptionType = { label: string; value: string | number };

type CustomInputProps<
	TFieldValues extends FieldValues,
	TName extends Path<TFieldValues>,
> = {
	disabled?: boolean;
	name: TName;
	control: Control<TFieldValues>;
	rules?: Omit<
		RegisterOptions<TFieldValues, TName>,
		"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
	>;
	label?: string;
	type:
	| "text"
	| "password"
	| "number"
	| "date"
	| "checkbox"
	| "radio"
	options?: OptionType[];
	placeholder?: string;
	defaultValue?: FieldPathValue<TFieldValues, TName>;
	errors?: FieldErrors<TFieldValues>;
	manualSearch?: boolean;
	onSearch?: (query: string) => void;
	callbackSelect?: ({
		label,
		value,
	}: { label: string; value: string | number }) => void;
	maxLength?: number;
	prefix?: ReactNode;
	suffix?: ReactNode;
};

const FormInput = <
	TFieldValues extends FieldValues,
	TName extends Path<TFieldValues>,
>({
	disabled,
	name,
	control,
	rules,
	label,
	type,
	options,
	placeholder,
	defaultValue,
	errors,
	manualSearch,
	onSearch,
	maxLength,
}: CustomInputProps<TFieldValues, TName>) => {
	const [searchInput, setSearchInput] = useState<string>("");

	const debouncedOnSearch = useMemo(
		() =>
			debounce((input: string) => {
				if (onSearch) onSearch(input.length >= 3 ? input : "");
			}, 300),
		[onSearch],
	);

	useEffect(() => {
		if (manualSearch) debouncedOnSearch(searchInput);
		return () => debouncedOnSearch.cancel();
	}, [searchInput, manualSearch, debouncedOnSearch]);

	const RenderInput = (field: ControllerRenderProps<TFieldValues, TName>) => {
		switch (type) {
			case "text":
				return (
					<Input
						disabled={disabled}
						maxLength={maxLength || 255}
						{...field}
						placeholder={placeholder}
						onChange={(e) => field.onChange(e.target.value)}
					/>
				);
			case "password":
				return (
					<Input
						type="password"
						{...field}
						placeholder={placeholder}
						onChange={(e) => field.onChange(e.target.value)}
					/>
				);
			case "number":
				return (
					<Input
						type="number"
						disabled={disabled}
						{...field}
						placeholder={placeholder}
						onChange={(value) => field.onChange(value)}
						style={{ width: "100%" }}
					/>
				);
			case "date":
				return (
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-[280px] justify-start text-left font-normal",
									!field.value && "text-muted-foreground"
								)}
							>
								<CalendarIcon />
								{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={field?.value}
								onSelect={field?.onChange}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				);
			case "checkbox":
				return (
					<Checkbox
						{...field}
						checked={field.value as boolean}
						onChange={(e) => field.onChange(e.target)}
					>
						{label}
					</Checkbox>
				);
			case "radio":
				return (
					<RadioGroup
						{...field}
						onChange={(e) => field.onChange(e.target)}
						value={field.value}
						defaultValue="option-one">
						{options?.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value as string} id={option?.value as string} />
								<Label htmlFor={option?.value as string}>{option?.value}</Label>
							</div>
						))}
					</RadioGroup>

				);
			default:
				return (
					<Input
						{...field}
						placeholder={placeholder}
						onChange={(e) => field.onChange(e.target.value)}
					/>
				);
		}
	};

	return (
		<div className="mb-2">
			{type !== "checkbox" && label && (
				<label
					className="text-xs text-neutral-400 dark:text-neutral-700"
					htmlFor={name}
				>
					{label}{" "}
					{rules?.required && (
						<span className="text-rose-700 dark:text-yellow-600">*</span>
					)}
				</label>
			)}
			<div className="h-1" />
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				rules={rules}
				render={({ field }) => RenderInput(field)}
			/>
			{errors?.[name] && (
				<p className="text-[8pt] text-rose-500 mt-1">
					{errors[name]?.message as string}
				</p>
			)}
		</div>
	);
};

export default FormInput;
