export enum UserType {
  PETSITTER = "petsitter",
  PETOWNER = "petowner",
}

export enum AnimalType {
  CAT = "cat",
  DOG = "dog",
  RABBIT = "rabbit",
  RODENT = "rodent",
  FISH = "fish",
  BIRD = "bird",
}

export interface IUserData {
  city: string;
  displayName: string;
  description: string;
  firstname: string;
  id: string;
  lastname: string;
  offerHistory?: string[];
  photo?: string;
  rating: number[];
  summary: string;
  skills: string;
  type: UserType;
  animals: AnimalType[];
}

export interface ICityData {
  value: string;
  label: string;
}
