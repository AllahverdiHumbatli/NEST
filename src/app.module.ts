import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './features/bloggers-platform/blogs/api/blogs-controller';
import { ConfigModule } from '@nestjs/config';
import { BloggersPlatformModule } from './features/bloggers-platform/bloggers-platform.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/nest'),
    BloggersPlatformModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {
}
