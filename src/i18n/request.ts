import { getRequestConfig } from "next-intl/server";
import messages from "@messages/ru.json";

export default getRequestConfig(async () => ({
  locale: "ru",
  messages,
}));
