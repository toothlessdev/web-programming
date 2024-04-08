import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as path from 'path';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  @Transform(({ value }) => value && `/${path.join('public', 'images', value)}`)
  image?: string;

  @CreateDateColumn()
  createdAt: Date;
}
