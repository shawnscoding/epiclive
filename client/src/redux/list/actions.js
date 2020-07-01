export const listActionTypes = {
  SET_ARTIST_LIST_LEFT: "SET_ARTIST_LIST_LEFT",
  SET_ARTIST_LIST_RIGHT: "SET_ARTIST_LIST_RIGHT",
  SET_GENRE_LIST_LEFT: "SET_GENRE_LIST_LEFT",
  SET_GENRE_LIST_RIGHT: "SET_GENRE_LIST_RIGHT",
  SET_MAIN_CN_LIST_RIGHT: 'SET_MAIN_CN_LIST_RIGHT',
  SET_MAIN_CN_LIST_LEFT: "SET_MAIN_CN_LIST_LEFT"
};

export const setArtistListLeft = (payload) => ({
  type: listActionTypes.SET_ARTIST_LIST_LEFT,
  payload,
});

export const setArtistListRight = (payload) => ({
  type: listActionTypes.SET_ARTIST_LIST_RIGHT,
  payload,
});

export const setGenreListLeft = (payload) => ({
  type: listActionTypes.SET_GENRE_LIST_LEFT,
  payload,
});

export const setGenreListRight = (payload) => ({
  type: listActionTypes.SET_GENRE_LIST_RIGHT,
  payload,
});

export const setMainCNListLeft = (payload) => ({
  type: listActionTypes.SET_MAIN_CN_LIST_LEFT,
  payload,
});

export const setMainCNListRight = (payload) => ({
  type: listActionTypes.SET_MAIN_CN_LIST_RIGHT,
  payload,
});

