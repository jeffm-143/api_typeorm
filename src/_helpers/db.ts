import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../users/user";
import config from "../config/config.json";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: []
});
