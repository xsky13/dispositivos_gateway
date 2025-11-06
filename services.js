export const services = [
    {
        route: "/dispositivos",
        proxy: {
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = '/api/dispositivos' + path;
                if (newPath.endsWith('/') && newPath !== '/') {
                    newPath = newPath.slice(0, -1);
                }
                return newPath;
            },
            on: {
                proxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('X-Service-API-Key', 'clave-muy-secreta');
                    const authHeader = req.headers["authorization"];
                    if (authHeader) {
                        proxyReq.setHeader("Authorization", authHeader);
                    }
                }
            }
        },
    },
    {
        route: "/auth",
        proxy: {
            target: "http://localhost:8086",
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = '/api/auth' + path;
                if (newPath.endsWith('/') && newPath !== '/') {
                    newPath = newPath.slice(0, -1);
                }
                return newPath;
            },
            on: {
                proxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('X-Service-API-Key', 'your-secret-service-api-key-12345');
                }
            }
        },
    },
    {
        route: "/alertas",
        proxy: {
            target: "http://localhost:8085",
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = '/api/alertas' + path;
                if (newPath.endsWith('/') && newPath !== '/') {
                    newPath = newPath.slice(0, -1);
                }
                return newPath;
            },
        }
    },
    {
        route: "/usuarios",
        proxy: {
            target: "http://localhost:8086",
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = '/api/usuarios' + path;
                if (newPath.endsWith('/') && newPath !== '/') {
                    newPath = newPath.slice(0, -1);
                }
                return newPath;
            },
            on: {
                proxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('X-Service-API-Key', 'your-secret-service-api-key-12345');
                    const authHeader = req.headers["Authorization"];
                    if (authHeader) {
                        proxyReq.setHeader("Authorization", authHeader);
                    }
                }
            }
        }
    },
];