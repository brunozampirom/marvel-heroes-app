import { Reducer, Action } from "redux";

export const Types = {
  SET_HERO: "@hero/SET_HERO",
  REMOVE_HERO: "@hero/REMOVE_HERO",
};

type FavoriteHeroProps = {
  id: number;
  name: string;
  image: string;
};

type FavoriteHeroesProps = {
  heroes: FavoriteHeroProps[];
};

const INITIAL_STATE = {
  heroes: [],
};

export const FavoriteHeroesReducer: Reducer<FavoriteHeroesProps> = (
  state = INITIAL_STATE,
  action: Action | any
) => {
  console.log(action);
  switch (action.type) {
    case Types.SET_HERO:
      return {
        ...state,
        heroes: [
          ...state.heroes,
          {
            id: action.id,
            name: action.name,
            image: action.image,
          },
        ],
      };
    case Types.REMOVE_HERO:
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
};

export const HeroesActions = {
  addFavoriteHeroAction: ({ id, name, image }: FavoriteHeroProps) => ({
    type: Types.SET_HERO,
    id,
    name,
    image,
  }),

  deleteFavoriteHeroAction: ({ id }: { id: number }) => ({
    type: Types.REMOVE_HERO,
    id,
  }),
};
