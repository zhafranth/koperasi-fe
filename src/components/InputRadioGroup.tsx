 import React from "react";
 import { cn } from "@/lib/utils";
 import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
 import { Label } from "@/components/ui/label";
 
 interface Option {
   value: string | number;
   label: string;
 }
 
 interface Props {
   options: Option[];
   value?: string | number;
   onChange: (value: string | number) => void;
   direction?: "horizontal" | "vertical";
   className?: string;
 }
 
 const InputRadioGroup: React.FC<Props> = ({
   options,
   value,
   onChange,
   direction = "vertical",
   className,
 }) => {
   const valueStr = value === undefined || value === null ? undefined : String(value);
 
   return (
     <RadioGroup
       value={valueStr}
       onValueChange={(v) => {
         const match = options.find((opt) => String(opt.value) === v);
         onChange(match ? match.value : v);
       }}
       className={cn(
         direction === "horizontal" ? "flex flex-wrap gap-4" : "grid gap-3",
         className
       )}
     >
       {options.map((opt) => {
         const id = `radio-${String(opt.value)}`;
         return (
           <div key={id} className="flex items-center gap-2">
             <RadioGroupItem value={String(opt.value)} id={id} />
             <Label htmlFor={id}>{opt.label}</Label>
           </div>
         );
       })}
     </RadioGroup>
   );
 };
 
 export default InputRadioGroup;
