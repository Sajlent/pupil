export enum UserType {
  PETSITTER = 'petsitter',
  PETOWNER = 'petowner',
}

export enum AnimalType {
  CAT = 'cat',
  DOG = 'dog',
  RABBIT = 'rabbit',
  RODENT = 'rodent',
  FISH = 'fish',
  BIRD = 'bird',
}

export interface IUserData {
  displayName: string;
  description: string;
  firstname: string;
  lastname: string;
  summary: string;
  skills: string;
  type: UserType;
  animals: AnimalType[];
}
