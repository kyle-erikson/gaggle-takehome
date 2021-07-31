import express from 'express';
import config from './config';
import loaders from './loaders';

const main = async () => {
  console.log("main entrance")
  const app = express();
  console.log("going to loaders")
  await loaders(app);
  console.log("done with loaders")

  try {
    app.listen(config.port, (): void => {
      console.log(`Connected successfully on port ${config.port}`);
    });
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
};

main();