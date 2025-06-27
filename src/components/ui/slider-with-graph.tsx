import { cn } from "@/lib/utils";
import { useMemo } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface PriceBucket {
  range: [number, number];
  count: number;
}

interface PriceGraphSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  distribution: PriceBucket[]; // from 0-200 with step 10, 20 buckets
  max: number;
  min: number;
  step: number;
}

//custom slider

interface CustomSliderProps {
  value: number[];
  onValueChange: (val: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function CustomSliderWithIconThumb({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
}: CustomSliderProps) {
  return (
    <SliderPrimitive.Root
      className="relative flex w-full touch-none select-none items-center"
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
    >
      {/* Track */}
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-primary/10">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      {/* Custom Thumb */}
      {value.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "block rounded-xl bg-white shadow-sm",
            "flex items-center justify-between gap-1 w-[32px] h-[32px]"
          )}
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="34"
              height="34"
              rx="8.5"
              fill="white"
              stroke="#E63963"
            />
            <path d="M26 18L20 14L20 22L26 18Z" fill="#5E5F65" />
            <path d="M10 18L16 22L16 14L10 18Z" fill="#5E5F65" />
          </svg>
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

export function PriceGraphSlider({
  value,
  onChange,
  distribution,
  max,
  min,
  step,
}: PriceGraphSliderProps) {
  const maxCount = useMemo(
    () => Math.max(...distribution?.map((d) => d.count)),
    [distribution]
  );

  return (
    <div className="relative w-full px-2 pb-4">
      {/* Bar graph */}
      <div className="absolute left-2 right-2 top-0 h-20 flex items-end pointer-events-none">
        {distribution?.map(({ count }, i) => {
          const heightPercent = (count / maxCount) * 100;

          return (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-t-md transition-all duration-300",
                "bg-muted"
              )}
              style={{
                height: `${heightPercent}%`,
              }}
            />
          );
        })}
      </div>

      {/* Slider */}
      <div className="relative gap-[2px] -20 pt-20">
        <CustomSliderWithIconThumb
          value={value}
          onValueChange={(val) => onChange([val[0], val[1]])}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
}
