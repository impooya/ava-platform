import { z } from "zod";

export const linkSchema = z.object({
  media_url: z.string({ message: "لطفا لینک را وارد کنید." }).min(2, {
    message: "حداقل بیش از دو کارکتر وارد کنید.",
  }),
});
