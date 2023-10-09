import { loadImage } from "@shared/ui/ImageUploader/utils";
import * as Yup from "yup";

const imageResolutionCheck = async (files: File[]) => {
  return await Promise.all(
    files.map(async (file) => {
      const img = await loadImage(URL.createObjectURL(file));

      if (img.naturalHeight < 600 && img.naturalWidth < 600) {
        return file;
      }
    })
  );
};

export const fileSchema = Yup.object({
  files: Yup.array()
    .of(Yup.mixed().required())
    .min(3, "Загрузите минимум 3 разных фотографии вашего объекта")
    .test(
      "fileResolution",
      "Одна или несколько картинок имеют плохое качество",
      async (value) => {
        const files = (await imageResolutionCheck(value as File[])).filter(
          Boolean
        );

        return !files.length;
      }
    )
    .required("Загрузите минимум 3 разных фотографии вашего объекта"),
});
