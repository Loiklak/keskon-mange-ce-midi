export type Option<TValue extends string> = {
  value: TValue;
  label: string;
};

type Props<TOptionValue extends string> = {
  onChange: (value: boolean) => void;
  label: string;
};

const TailwindToggle = () => (
  <div className="flex flex-col items-center relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
);
export function ToggleOptionPicker<TOptionValue extends string>({
  onChange,
  label,
}: Props<TOptionValue>) {
  return (
    <form className="flex flex-col gap-2 items-center text-xl">
      <label className="flex lg:flex-col gap-4 lg:gap-0 flex-row items-center cursor-pointer">
        {label}
        <input
          type="checkbox"
          value=""
          className="sr-only peer flex flex-col items-center"
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        ></input>
        <TailwindToggle />
      </label>
    </form>
  );
}
