import config from "@/config.json";
interface CreateArguments {
  roomName: string;
  username: string;
}

export function create(roomConfig: CreateArguments) {
  return fetch(config.API_URL + "/rooms", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: localStorage["token"] || "test",
    },
    body: JSON.stringify(roomConfig),
  });
}
