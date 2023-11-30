import * as Yup from "yup";
export const calendarInfoSchema = Yup.object({
  calendarAgree: Yup.boolean().oneOf([true], "Я согласен"),
});

export type CalendarInfoType = Yup.InferType<typeof calendarInfoSchema>;
