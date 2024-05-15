import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

export type Option<TValue extends string> = {
  value: TValue;
  label: string;
};

type Props<TOptionValue extends string> = {
  items: Option<TOptionValue>[];
  value: string;
  onChange: (value: TOptionValue) => void;
  defaultValue?: string;
  label: string;
};

export function SingleOptionPicker<TOptionValue extends string>({
  items,
  onChange,
  value,
  defaultValue,
  label,
}: Props<TOptionValue>) {
  return (
    <form className="flex flex-col gap-2 items-center text-xl">
      <label className="text-base lg:text-xl">{label} :</label>
      <RadioGroup
        defaultValue={defaultValue ?? items[0].value}
        className="grid grid-cols-3 gap-4"
        value={value}
        onValueChange={onChange}
      >
        {items.map((item) => (
          <div key={item.value}>
            <RadioGroupItem
              value={item.value}
              id={item.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={item.value}
              className="h-full text-center flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary duration-75"
            >
              {item.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </form>
  );
}
