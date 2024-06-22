import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
    type: 'sqlite',
    database: '.db/db.sql',
    synchronize: true, // Obs: use synchronize: true somente em desenvolvimento.
};
