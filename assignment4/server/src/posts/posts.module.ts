import { BadRequestException, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './model/post.model';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid';

const multerModule = MulterModule.register({
  limits: {
    fileSize: 10000000, // 10MB
  },
  fileFilter: (request, file, callback) => {
    const extension = path.extname(file.originalname);
    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
      return callback(
        new BadRequestException(
          '이미지 파일 형식은 jpg/jpeg/png 파일이어야 합니다',
        ),
        false,
      );
    }
    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination: (request, response, callback) => {
      callback(null, path.join(process.cwd(), 'public', 'images'));
    },
    filename: (request, file, callback) => {
      callback(null, `${uuid()}${path.extname(file.originalname)}`);
    },
  }),
});

@Module({
  imports: [TypeOrmModule.forFeature([PostModel]), multerModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
