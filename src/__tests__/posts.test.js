import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import { createPost } from '../services/posts.js'
import { Post } from '../db/models/post.js'
const TEST_TIMEOUT = 60000

describe('creating posts', () => {
  test(
    'with all parameters should succeed',
    async () => {
      const post = {
        title: 'DJango 5 by Example',
        author: 'Antonio Meles',
        contents: 'If you want to learn DJango by doing this book is for your',
        tags: ['python', 'DJango'],
      }

      const createdPost = await createPost(post)
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
      const foundPost = await Post.findById(createdPost._id)
      expect(foundPost).toEqual(expect.objectContaining(post))
      expect(foundPost.createdAt).toBeInstanceOf(Date)
      expect(foundPost.updatedAt).toBeInstanceOf(Date)
    },
    TEST_TIMEOUT,
  )
  test(
    'without title should fail',
    async () => {
      const post = {
        author: 'Daniel Bugl',
        contents: 'Post with no title',
        tags: ['empty'],
      }
      try {
        await createPost(post)
      } catch (error) {
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(error.message).toContain('`title` is required')
      }
    },
    TEST_TIMEOUT,
  )

  test(
    'with minimal parameters should succeed',
    async () => {
      const post = {
        title: 'Only a title',
      }
      const createdPost = await createPost(post)
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
    },
    TEST_TIMEOUT,
  )
})
