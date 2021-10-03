/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  Home: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Heroes: undefined;
  Favorites: undefined;
  Search: undefined;
  HeroDetails: { id: number };
};

export type RootTabScreenProps<
  Screen extends keyof RootTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type Urls = {
  type: string;
  url: string;
};

export type StorySummary = {
  resourceURI?: string;
  name?: string;
};

export type ComicList = {
  available?: number;
  returned?: number;
  collectionURI: string;
  items?: StorySummary[];
};

export type StoryList = {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: StorySummary[];
};

export type EventList = {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: StorySummary[];
};

export type SeriesList = {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: StorySummary[];
};

export type Character = {
  id: number;
  name: string;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls: Urls[];
  thumbnail: { path: string; extension: "jpeg" | "jpg" | "png" };
  comics?: ComicList[];
  stories?: StoryList[];
  events?: EventList[];
  series?: SeriesList[];
};
