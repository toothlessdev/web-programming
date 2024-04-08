import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { PostModel } from './posts/model/post.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

const TypeORMRootModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'database.db',
  synchronize: true,
  entities: [PostModel],
});

const serveStaticModule = ServeStaticModule.forRoot({
  rootPath: path.join(process.cwd(), 'public'),
  serveRoot: '/public',
});

@Module({
  imports: [TypeORMRootModule, PostsModule, serveStaticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
