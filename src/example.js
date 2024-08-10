import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'
await initDatabase()

const post = new Post({
  title: 'Building LLM Powered Application',
  author: 'Valentina Alto',
  Contents:
    'Building LLM Powered Applications delves into the fundamental concepts, cutting-edge technologies and practical...',
  tags: ['AI', 'Machine Learning', 'LLM'],
})

const createdPost = await post.save()

await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Building LLM Powered Application - Version2' },
})
const posts = await Post.find()
console.log(posts)
