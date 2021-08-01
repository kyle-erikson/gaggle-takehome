import express from 'express';
import config from './config';
import loaders from './loaders';

export const main = async () => {
  const app = express();
  
  await loaders(app);

  try {
    app.listen(config.port, (): void => {
      console.log(`Connected successfully on port ${config.port}`);
    });
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
};

main();