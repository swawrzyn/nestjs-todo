import { RequestMethod, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RedocModule, RedocOptions } from "nestjs-redoc";
import { AppModule } from "./app.module";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix("api/v1", {
    exclude: [{ path: "health", method: RequestMethod.GET }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle("NestJS Todo Backend")
    .setDescription("NestJS Backend for react-todo app.")
    .addTag("todo")
    .addServer("http://localhost:3001")
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const redocOptions: RedocOptions = {
    title: "Redoc Module",
    logo: {
      url: "https://redocly.github.io/redoc/petstore-logo.png",
      backgroundColor: "#F0F0F0",
      altText: "PetStore Logo",
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    noAutoAuth: true,
    pathInMiddlePanel: true,
    auth: {
      enabled: true,
      user: "admin",
      password: "123",
    },
    tagGroups: [
      {
        name: "Core resources",
        tags: ["todo"],
      },
    ],
  };

  await RedocModule.setup("/api/docs", app, document, redocOptions);
  await app.listen(3001);
}
bootstrap();
