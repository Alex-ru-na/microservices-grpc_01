import dotenv from "dotenv";

dotenv.config();

export const config = {
  greeter_microservice: process.env.API_URL_GREETER,
  client_port: process.env.PORT,
};
