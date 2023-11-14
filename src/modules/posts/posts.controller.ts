import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll() {
    // get all posts in the db
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    // find the post with this id
    const post = await this.postService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // if post exist, return the post
    return post;
  }

  @Post()
  async create(@Body() post: PostDto): Promise<PostEntity> {
    // create a new post and return the newly created post
    return await this.postService.create(post);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
  ): Promise<PostEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
    );

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return the updated post
    return updatedPost;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the post with this id
    const deleted = await this.postService.delete(id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
