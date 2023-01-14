export interface People {
  id?: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  image?: string;
  species: string;
  birthYear: string;
}

export interface PeopleAkabab {
  id: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  homeworld: string;
  wiki: string;
  image: string;
  born: string;
  bornLocation: string;
  died: string;
  diedLocation: string;
  species: string;
  hairColor: string;
  eyeColor: string;
  skinColor: string;
  cybernetics: string;
  affiliations: string[];
  masters: string[];
  apprentices: string[];
  formerAffiliations: string[];
}

export interface PeopleSwapi {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiResponse<t> {
  count: number;
  next: string | null;
  previous: string | null;
  results: t[];
}
