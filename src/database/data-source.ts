import { DataSource } from "typeorm"
import { User } from "../entities/user";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "george",
    password: "gd123",
    database: "api_softex",
    entities: [User],
    synchronize: true,
});
