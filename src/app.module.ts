import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { BlogsModule } from './features/blogs/blogs.module';
import { BlogsController } from './features/blogs/api/blogs-controller';
import {BlogsService} from './features/blogs/domain/blogs-service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/nest'),
    BlogsModule
  ],
  controllers: [AppController, BlogsController],
  providers: [AppService, BlogsService],
})
export class AppModule {}
