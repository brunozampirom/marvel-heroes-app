import axios from "axios";
import md5 from "md5";
import { Character } from "../types";

type getAllCharactersProps = {
  heroes: Character[];
  offset: number;
};

export const getAllCharacters = async (
  offset: number = 0
): Promise<getAllCharactersProps | any> => {
  const timestamp = new Date().getTime();
  const publickey = "publickey";
  const privatekey = "privatekey";
  const hash = md5(timestamp + privatekey + publickey);
  const limit = 100;
  return axios
    .get(`https://gateway.marvel.com:443/v1/public/characters`, {
      params: {
        ts: timestamp,
        apikey: publickey,
        hash: hash,
        offset: offset,
        limit: limit,
      },
      timeout: 10000,
    })
    .then((response: any) => {
      const {
        results,
        offset,
      }: { results: Character[]; offset: number } = response?.data?.data;
      console.log(response);
      return { heroes: results, offset: offset + limit };
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getCharacterInfo = async (
  characterId: number
): Promise<Character> => {
  const timestamp = new Date().getTime();
  const publickey = "publickey";
  const privatekey = "privatekey";
  const hash = md5(timestamp + privatekey + publickey);
  return axios
    .get(`https://gateway.marvel.com:443/v1/public/characters/${characterId}`, {
      params: {
        ts: timestamp,
        apikey: publickey,
        hash: hash,
      },
      timeout: 10000,
    })
    .then((response: any) => {
      console.log(response);
      const result = response.data?.data?.results[0];
      return result;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
