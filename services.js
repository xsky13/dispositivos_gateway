export const services = [
    {
        route: "/dispositivos",
        proxy: {
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: () => '/api/dispositivos'
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
            pathRewrite: () => '/api/usuarios'
        }
    },
];