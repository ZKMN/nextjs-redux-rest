const commonConfig = {
  development: { apiUrl: process.env.REACT_APP_API_URL },
  test: { apiUrl: process.env.REACT_APP_API_URL },
  staging: { apiUrl: process.env.REACT_APP_API_URL },
  production: { apiUrl: process.env.REACT_APP_API_URL },
}[process.env.NODE_ENV || 'development'];

export const config = {
  api: {
    timeout: 30000,
    url: commonConfig.apiUrl,
  },
};
