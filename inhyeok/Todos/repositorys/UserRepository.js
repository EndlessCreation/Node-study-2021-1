import { User } from "../models";

export const findByEmail = async (email) => {
  try {
    return await User.findAll({ where: { email: email } });
  } catch (err) {
    console.error(err);
  }
};

export const createLocal = async (data) => {
  try {
    return await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      provider: "local",
    });
  } catch (err) {
    console.error(err);
  }
};

export const findByEmailLocal = async (email) => {
  try {
    return await User.findAll({ where: { email: email, provider: "local" } });
  } catch (err) {
    console.error(err);
  }
};
