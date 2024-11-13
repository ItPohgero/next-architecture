import { Icon } from "@iconify/react";
import {
	Checkbox,
	ColorPicker,
	DatePicker,
	Input,
	InputNumber,
	Radio,
	Select,
	Spin,
	TimePicker,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { debounce } from "lodash";
import React, {
	Fragment,
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
import { Else, If, Then } from "react-if";

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
		| "time"
		| "checkbox"
		| "radio"
		| "color"
		| "select";
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
	callbackSelect,
	maxLength,
	prefix,
	suffix,
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
						prefix={prefix}
						suffix={suffix}
						disabled={disabled}
						maxLength={maxLength || 255}
						showCount={!!maxLength}
						{...field}
						placeholder={placeholder}
						onChange={(e) => field.onChange(e.target.value)}
					/>
				);
			case "password":
				return (
					<Input.Password
						{...field}
						placeholder={placeholder}
						onChange={(e) => field.onChange(e.target.value)}
					/>
				);
			case "number":
				return (
					<InputNumber
						disabled={disabled}
						{...field}
						placeholder={placeholder}
						onChange={(value) => field.onChange(value)}
						style={{ width: "100%" }}
					/>
				);
			case "date":
				return (
					<DatePicker
						disabled={disabled}
						className="w-full"
						suffixIcon={
							<Icon
								className="w-6 h-6"
								icon="solar:calendar-mark-line-duotone"
							/>
						}
						{...field}
						value={dayjs(field.value) as Dayjs | null}
						onChange={(date) => field.onChange(date as Dayjs | null)}
					/>
				);
			case "time":
				return (
					<TimePicker
						disabled={disabled}
						{...field}
						value={field.value as Dayjs | null}
						onChange={(time) => field.onChange(time as Dayjs | null)}
					/>
				);
			case "checkbox":
				return (
					<Checkbox
						{...field}
						checked={field.value as boolean}
						onChange={(e) => field.onChange(e.target.checked)}
					>
						{label}
					</Checkbox>
				);
			case "select": {
				const selectProps = {
					...field,
					placeholder,
					className: "w-full",
					showSearch: true,
					loading: false,
					options: options ?? [],
					notFoundContent: <Spin size="small" />,
					suffixIcon: <Icon className="w-8 h-8" icon="mdi:chevron-down" />,
					onChange: (
						value: string | number | (string | number)[],
						option: OptionType | OptionType[],
					) => {
						field.onChange(value);

						if (Array.isArray(option)) {
							for (const opt of option) {
								if (opt.label && callbackSelect) {
									callbackSelect({
										label: opt.label.toString(),
										value: opt.value,
									});
								}
							}
						} else if (option?.label && callbackSelect) {
							callbackSelect({
								label: option.label.toString(),
								value: option.value,
							});
						}
					},
				};

				return (
					<Fragment>
						<If condition={manualSearch}>
							<Then>
								<Select
									{...selectProps}
									filterOption={false}
									onSearch={setSearchInput}
								/>
							</Then>
							<Else>
								<Select
									{...selectProps}
									filterOption={(input, option) =>
										(option?.label ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
								/>
							</Else>
						</If>
					</Fragment>
				);
			}
			case "radio":
				return (
					<Radio.Group
						{...field}
						onChange={(e) => field.onChange(e.target.value)}
						value={field.value as string | number}
					>
						{options?.map((option) => (
							<Radio key={option.value} value={option.value}>
								{option.label}
							</Radio>
						))}
					</Radio.Group>
				);
			case "color":
				return (
					<ColorPicker {...field} onChange={(color) => field.onChange(color)} />
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
