import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: false, // Entity에 맞게 DB를 자동으로 변경 할지 여부
    ENTITIES: [__dirname + '/domain/*.entity.ts'], // Entity 파일 경로를 지정하여 자동으로 import되게 한다.
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js'], // Migration에 필요한 파일
    CLI: {
      migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: false,
  };
  const ormconfig: TypeOrmModuleOptions = {
    type: 'better-sqlite3',
    database: 'nest-first.db',
    autoLoadEntities: true,
    logging: true,
    dropSchema: false,
    entities: commonConf.ENTITIES,
    synchronize: commonConf.SYNCRONIZE,
    // migrations: commonConf.MIGRATIONS,
    // migrationsRun: commonConf.MIGRATIONS_RUN,
  };

  return ormconfig;
}
