interface CognitoConfig {
  userPoolId: string;
  clientId: string;
  endpoint: string;
}

interface CoreApiConfig {
  baseUrl: string;
}

interface AppConfig {
  mode: string;
  port: number;
  baseUrl: string;
}

interface GithubProfilesConfig {
  ownerGithubProfile: string;
  ownerGithubName: string;
  shadcnGithubProfile: string;
  multiavatarGithubProfile: string;
}

interface EnvConfig {
  app: AppConfig;
  coreApi: CoreApiConfig;
  cognito: CognitoConfig;
  githubProfiles: GithubProfilesConfig;
}

export const env: EnvConfig = {
  app: {
    mode: import.meta.env.VITE_APP_MODE,
    port: import.meta.env.VITE_APP_PORT,
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  },
  coreApi: {
    baseUrl: import.meta.env.VITE_CORE_API_BASE_URL,
  },
  cognito: {
    userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID,
    clientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
    endpoint: import.meta.env.VITE_AWS_COGNITO_ENDPOINT,
  },
  githubProfiles: {
    ownerGithubProfile: import.meta.env.VITE_OWNER_GITHUB_PROFILE,
    ownerGithubName: import.meta.env.VITE_OWNER_GITHUB_NAME,
    shadcnGithubProfile: import.meta.env.VITE_SHADCN_GITHUB_PROFILE,
    multiavatarGithubProfile: import.meta.env.VITE_MULTIAVATAR_GITHUB_PROFILE,
  },
};
