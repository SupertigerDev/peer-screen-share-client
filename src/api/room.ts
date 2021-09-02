import config from "@/config.json";
interface CreateArguments {
  roomName: string;
  username: string;
}

export function create(roomConfig: CreateArguments) {
  return fetch(config.API_URL + "/rooms", {
    method: "POST",
    body: JSON.stringify(roomConfig),
  });
}
