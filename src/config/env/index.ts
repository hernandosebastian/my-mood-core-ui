interface CognitoConfig {
  userPoolId: string;
  clientId: string;
  endpoint: string;
}

interface CoreApiConfig {
  baseUrl: string;
}

interface AppConfig {
  baseUrl: string;
}

interface EnvConfig {
  app: AppConfig;
  coreApi: CoreApiConfig;
  cognito: CognitoConfig;
}

export const env: EnvConfig = {
  app: {
    baseUrl: import.meta.env.PUBLIC_APP_BASE_URL,
  },
  coreApi: {
    baseUrl: import.meta.env.PUBLIC_CORE_API_BASE_URL,
  },
  cognito: {
    userPoolId: import.meta.env.PUBLIC_AWS_COGNITO_USER_POOL_ID,
    clientId: import.meta.env.PUBLIC_AWS_COGNITO_CLIENT_ID,
    endpoint: import.meta.env.PUBLIC_AWS_COGNITO_ENDPOINT,
  },
};
