import app from "./server";
import PORT from "./config/env";
import { AppDataSource } from "./config/data-source";
import 'reflect-metadata';
import { preLoadUsersData, preloadCredentialsData } from "./helpers/preload";
//IIFE Immediately Invoked Function Expression

(async () => {
  await AppDataSource.initialize();
  await preLoadUsersData();
  await preloadCredentialsData();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
