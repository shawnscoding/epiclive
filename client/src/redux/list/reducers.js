import { listActionTypes } from './actions';
import { genreList, artistList } from './../../utils/Data';
import { mainActionTypes } from './../main/actions';
import { getLeftMaintist, getRightMainList } from './../../utils/Helper';

const initialState = {
  artistListLeft: artistList,
  artistListRight: [],
  genreListLeft: genreList,
  genreListRight: [],
  mainCNListLeft: null,
  mainCNListRight: null,
};

const list = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case mainActionTypes.GET_CURRENT_CATEGORY:
      return {
        ...state,
        mainCNListLeft: getLeftMaintist(payload.category),
        mainCNListRight: getRightMainList(payload.category),
      };
    case listActionTypes.SET_ARTIST_LIST_LEFT:
      return { ...state, artistListLeft: payload };
    case listActionTypes.SET_MAIN_CN_LIST_LEFT:
      return { ...state, mainCNListLeft: payload };

    case listActionTypes.SET_ARTIST_LIST_RIGHT:
      return { ...state, artistListRight: payload };
    case listActionTypes.SET_MAIN_CN_LIST_RIGHT:
      return { ...state, mainCNListRight: payload };

    case listActionTypes.SET_GENRE_LIST_LEFT:
      return { ...state, genreListLeft: payload };
    case listActionTypes.SET_GENRE_LIST_RIGHT:
      return { ...state, genreListRight: payload };
    default:
      return state;
  }
};

export default list;
// midufyu
