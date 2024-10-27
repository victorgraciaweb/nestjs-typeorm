export const EnvConfiguration = () => ({
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    port: process.env.PORT || 3000,
    hostApi: process.env.HOST_API,
    jwtSecret: process.env.JWT_SECRET
});