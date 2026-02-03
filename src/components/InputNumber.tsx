import React from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { parseNumber } from "@/lib/utils";

type InputNumberProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "onChange" | "value" | "defaultValue"
> & {
  value?: number | string;
  onChange?: (value: number | string) => void;
  defaultValue?: string | number | null | undefined;
  thousandSeparator?: boolean | string;
  decimalSeparator?: string;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  allowNegative?: boolean;
};

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  thousandSeparator,
  decimalSeparator,
  decimalScale,
  fixedDecimalScale,
  allowNegative,
  ...props
}) => {
  const thousand =
    typeof thousandSeparator === "string"
      ? thousandSeparator
      : thousandSeparator
        ? ","
        : undefined;

  return (
    <NumericFormat
      customInput={Input}
      value={value}
      thousandSeparator={thousand}
      decimalSeparator={decimalSeparator}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      allowNegative={allowNegative}
      onValueChange={(vals) => {
        if (thousandSeparator) {
          const next =
            typeof vals.floatValue === "number"
              ? vals.floatValue
              : parseNumber(vals.value);
          if (next !== undefined) onChange?.(next);
        } else {
          onChange?.(vals.value);
        }
      }}
      {...props}
    />
  );
};

export default InputNumber;
