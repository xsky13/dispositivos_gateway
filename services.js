export const services = [
    {
        route: "/dispositivos",
        proxy: {
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: () => '/api/dispositivos',
            on: {
                proxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('X-Service-API-Key', 'clave-muy-secreta');
                }
            }
        },
    },
    {
        route: "/alertas",
        proxy: {
            target: "http://localhost:8085",
            changeOrigin: true,
            pathRewrite: () => '/api/alertas'
        }
    },
    {
        route: "/usuarios",
        proxy: {
            target: "http://localhost:8086",
            changeOrigin: true,
            pathRewrite: () => '/api/usuarios',
            on: {
                proxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('X-Service-API-Key', 'your-secret-service-api-key-12345');
                }
            }
        }
    },
];