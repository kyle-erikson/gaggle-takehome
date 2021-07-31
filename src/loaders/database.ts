import { Connection, createConnection, useContainer} from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from '../config';
import { User } from '../models/userModel';

export default async (): Promise<Connection> => {
  // read connection options from config file which reads from ENV
  const connectionOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    username: config.database.username,
    password: config.database.password,
    logging: true,
    entities: [User],
  };

  // typedi + typeorm
  useContainer(Container);

  // create a connection using modified connection options
  const connection = await createConnection(connectionOptions);

  return connection;
};