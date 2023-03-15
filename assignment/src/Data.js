import { faker } from "@faker-js/faker";

import dayjs from "dayjs";
// import { faker } from '@faker-js/faker/locale/de';

export const USERS = [];

export function createRandomUser() {
  const diff = () => {
    const date1 = dayjs(faker.date.birthdate());
    const date2 = dayjs(new Date());
    return Math.floor(date2.diff(date1) / 31556952000);
  };
  const age = diff();
  const carAge = diff();
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    country: faker.address.country(),
    name: faker.name.fullName(),
    avatar: faker.image.avatar(),
    age,
    sex: faker.name.sex(),
    vehicle: {
      model: faker.vehicle.model(),
      manufacturer: faker.vehicle.manufacturer(),
      color: faker.vehicle.color(),
      carAge,
    },
  };
}

Array.from({ length: 100000 }).forEach(() => {
  USERS.push(createRandomUser());
});
