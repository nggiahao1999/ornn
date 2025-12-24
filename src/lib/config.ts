import path from "path";

function env(key: string, defaultValue: any = null): any {
  const value = process.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (value === "empty") return "";
  if (!isNaN(Number(value)) && value.trim() !== "") return Number(value);

  return value;
}

export const config = {
  app: {
    env: env("NODE_ENV", "development"),
    host: env("HOST", "localhost"),
    port: env("PORT", 3000),
    timezone: env("TZ", "UTC"),
    locale: env("LOCALE", "en"),
    fallback_locale: env("FALLBACK_LOCALE", "en"),
    key: env("APP_KEY"),
  },

  cache: {
    store: env("CACHE_STORE", "database"), // inmemory, database, redis
    prefix: env("CACHE_PREFIX", "ornn_cache_"),
  },

  filesystems: {
    default: env("FILESYSTEM_DISK", "local"),
    disks: {
      local: {
        driver: "local",
        root: path.join(__dirname, "../storage/app"),
        throw: false,
      },
      public: {
        driver: "local",
        root: path.join(__dirname, "../storage/app/public"),
        url: env("APP_URL") + "/storage",
        visibility: "public",
        throw: false,
      },
      s3: {
        driver: "s3",
        key: env("AWS_ACCESS_KEY_ID"),
        secret: env("AWS_SECRET_ACCESS_KEY"),
        region: env("AWS_DEFAULT_REGION"),
        bucket: env("AWS_BUCKET"),
        url: env("AWS_URL"),
        endpoint: env("AWS_ENDPOINT"),
        use_path_style_endpoint: env("AWS_USE_PATH_STYLE_ENDPOINT", false),
        throw: false,
      },
    },
  },

  mail: {
    default: env("MAIL_MAILER", "smtp"),
    mailers: {
      smtp: {
        transport: "smtp",
        host: env("MAIL_HOST", "smtp.mailgun.org"),
        port: env("MAIL_PORT", 587),
        encryption: env("MAIL_ENCRYPTION", "tls"),
        username: env("MAIL_USERNAME"),
        password: env("MAIL_PASSWORD"),
        timeout: null,
      },
      ses: {
        transport: "ses",
      },
      log: {
        transport: "log",
        channel: env("MAIL_LOG_CHANNEL"),
      },
      array: {
        transport: "array",
      },
    },
    from: {
      address: env("MAIL_FROM_ADDRESS", "hello@example.com"),
      name: env("MAIL_FROM_NAME", "Example"),
    },
  },

  queue: {
    default: env("QUEUE_CONNECTION", "sync"),
    connections: {
      sync: {
        driver: "sync",
      },
      database: {
        driver: "database",
        table: "jobs",
        queue: "default",
        retry_after: 90,
      },
      redis: {
        driver: "redis",
        queue: env("REDIS_QUEUE", "default"),
        retry_after: 90,
        block_for: null,
        after_commit: false,
      },
    },
  },

  services: {
    ses: {
      key: env("AWS_ACCESS_KEY_ID"),
      secret: env("AWS_SECRET_ACCESS_KEY"),
      region: env("AWS_DEFAULT_REGION", "us-east-1"),
    },
    redis: {
      host: env("REDIS_HOST", "127.0.0.1"),
      port: env("REDIS_PORT", 6379),
      username: env("REDIS_USERNAME"),
      password: env("REDIS_PASSWORD"),
    },
    memcached: {
      host: env("MEMCACHED_HOST", "127.0.0.1"),
      port: env("MEMCACHED_PORT", 11211),
      sasl: [env("MEMCACHED_USERNAME"), env("MEMCACHED_PASSWORD")],
      options: {},
    },
    stripe: {
      key: env("STRIPE_KEY"),
      secret: env("STRIPE_SECRET"),
      webhook: {
        secret: env("STRIPE_WEBHOOK_SECRET"),
        tolerance: env("STRIPE_WEBHOOK_TOLERANCE", 300),
      },
    },
  },

  cors: {
    paths: ["api/*", "sanctum/csrf-cookie"],
    allowed_methods: ["*"],
    allowed_origins: ["*"],
    allowed_origins_patterns: [],
    allowed_headers: ["*"],
    exposed_headers: [],
    max_age: 0,
    supports_credentials: false,
  },
};

export type AppConfig = typeof config;
