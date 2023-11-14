import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/user.entity';
import { POST_REPOSITORY } from '../../core/constants';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}

  async create(post: PostDto): Promise<Post> {
    return await this.postRepository.create<Post>({ ...post });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id) {
    return await this.postRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
}
