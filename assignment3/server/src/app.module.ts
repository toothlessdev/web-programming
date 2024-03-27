import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { PostModel } from './posts/model/post.model';

const TypeORMRootModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'database.db',
  synchronize: true,
  entities: [PostModel],
});

@Module({
  imports: [TypeORMRootModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
