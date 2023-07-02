export const REST_API_PLAYLISTS = {
  GET_ALL: {
    uri: "playlist",
    method: "GET",
  },
  GET_ONE: {
    uri: "playlist/:playlistId",
    method: "GET",
  },
  CREATE: {
    uri: "playlist",
    method: "POST",
  },
  UPDATE: {
    uri: "playlist/:playlistId",
    method: "PATCH",
  },
};
