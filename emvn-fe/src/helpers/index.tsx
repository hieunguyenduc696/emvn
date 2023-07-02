import moment, { Moment } from "moment";
import { EDateFormat } from "../constant";

export const formatDate = (date?: string | Date | Moment) => {
  return moment(date).format(EDateFormat.COMMON_DATE_FORMAT);
};

export const getFileFromUrl = async (
  url: string,
  name?: string,
  defaultType = "image/jpeg"
) => {
  const response = await fetch(url);
  const data = await response.blob();

  return new File([data], name || "", {
    type: data.type || defaultType,
  });
};
