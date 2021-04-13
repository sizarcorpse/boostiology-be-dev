// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'mongoose',
//       settings: {
//         host: env('DATABASE_HOST', '127.0.0.1'),
//         srv: env.bool('DATABASE_SRV', false),
//         port: env.int('DATABASE_PORT', 27017),
//         database: env('DATABASE_NAME', 'bw-dev'),
//         username: env('DATABASE_USERNAME', null),
//         password: env('DATABASE_PASSWORD', null),
//       },
//       options: {
//         authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
//         ssl: env.bool('DATABASE_SSL', false),
//       },
//     },
//   },
// });

module.exports = ({ env }) => {
  if (env("NODE_ENV") === "production") {
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "mongoose",
          settings: {
            host: env("DATABASE_HOST"),
            srv: env.bool("DATABASE_SRV", true),
            port: env.int("DATABASE_PORT", 27017),
            database: env("DATABASE_NAME"),
            username: env("DATABASE_USERNAME"),
            password: env("DATABASE_PASSWORD"),
          },
          options: {
            authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
            ssl: env.bool("DATABASE_SSL", true),
          },
        },
      },
    };
  }

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "mongoose",
        settings: {
          host: env("DATABASE_HOST_DEV"),
          srv: env.bool("DATABASE_SRV_DEV", false),
          port: env.int("DATABASE_PORT_DEV", 27017),
          database: env("DATABASE_NAME_DEV"),
          username: env("DATABASE_USERNAME_DEV"),
          password: env("DATABASE_PASSWORD_DEV"),
        },
        options: {
          authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
          ssl: env.bool("DATABASE_SSL", false),
        },
      },
    },
  };
};
