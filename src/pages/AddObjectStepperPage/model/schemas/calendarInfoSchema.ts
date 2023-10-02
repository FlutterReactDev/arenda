import * as Yup from "yup";
export const calendarInfoSchema = Yup.object({
  calendarAgree: Yup.boolean().oneOf([true], "Я согласен"),
});
