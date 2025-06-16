import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  personalDetailsSchema,
  type PersonalDetailsData,
} from "@/components/form-steps/lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "../base-form-step";
import { fetchPersonalDetails } from "./data/api";
import { ControlledSelect } from "../../ui/controlled-select";

export function PersonalDetailsStep(props: FormStepProps<PersonalDetailsData>) {
  const { data, config } = props;
  const { data: formOptions } = useSuspenseQuery({
    queryKey: [`${config.id}-form-options`],
    queryFn: fetchPersonalDetails,
  });

  const form = useForm<PersonalDetailsData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: data,
    mode: "onChange",
  });

  return (
    <BaseFormStep {...props} form={form}>
      <div className="grid gap-4">
        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="date"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ControlledSelect<PersonalDetailsData>
          form={form}
          name="nationality"
          options={formOptions.nationality}
          placeholder="Nationality"
        />
        <ControlledSelect<PersonalDetailsData>
          form={form}
          name="gender"
          options={formOptions.gender}
          placeholder="Gender"
        />

        <ControlledSelect<PersonalDetailsData>
          form={form}
          name="familyBackground"
          options={formOptions.familyBackground}
          placeholder="Family Background"
        />

        <ControlledSelect<PersonalDetailsData>
          form={form}
          name="academicBackground"
          options={formOptions.academicBackground}
          placeholder="Academic Background"
        />

        <ControlledSelect<PersonalDetailsData>
          form={form}
          name="languageProficiency"
          options={formOptions.languageProficiency}
          placeholder="Language Proficiency"
        />
      </div>
    </BaseFormStep>
  );
}
