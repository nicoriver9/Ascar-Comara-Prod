"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const server = app.getHttpAdapter().getInstance();
    server.use((req, res, next) => {
        console.log(`HTTP ${req.method} request to ${req.path}`);
        next();
    });
    server.use(express.static((0, path_1.join)(__dirname, '../public')));
    server.use((req, res, next) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile((0, path_1.join)(__dirname, '../public', 'index.html'));
        }
        else {
            next();
        }
    });
    server.use('/attachments', express.static((0, path_1.join)(__dirname, '../public/attachments')));
    await app.listen(process.env.PORT || 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map