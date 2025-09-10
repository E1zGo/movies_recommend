<template>
  <div class="comment-item">
    <div class="comment-header">
      <span class="comment-user">用户 {{ comment.userId }}</span>
      <span v-if="comment.userId === currentUserId" class="my-comment-tag">你的评论</span>
    </div>
    <p class="comment-text">{{ comment.text }}</p>
    <div class="comment-actions">
      <span class="comment-action" @click="$emit('handleLike', comment.id)">
        👍 ({{ comment.likes }})
      </span>
      <span class="comment-action" @click="$emit('toggleReplyInput', comment.id)">
        💬 回复
      </span>
      <span class="comment-action" @click="$emit('handleReport', comment.id)">
        举报
      </span>
      <span v-if="comment.userId === currentUserId" class="comment-action delete-action" @click="$emit('handleDelete', comment.id)">
        删除
      </span>
    </div>

    <div v-if="replyingToId === comment.id" class="reply-input-area">
      <input type="text" placeholder="回复这条评论..." class="comment-input" v-model="newReplyText" @keyup.enter="$emit('handleReply', comment.id, comment.userId)" />
      <button class="comment-button" @click="$emit('handleReply', comment.id, comment.userId)">回复</button>
    </div>

    <div v-if="comment.replies && comment.replies.length > 0" class="reply-list">
      <div v-for="reply in comment.replies" :key="reply.id">
        <CommentNode 
          :comment="reply" 
          :currentUserId="currentUserId"
          :replyingToId="replyingToId"
          :newReplyText="newReplyText"
          @toggleReplyInput="$emit('toggleReplyInput', $event)"
          @handleReply="$emit('handleReply', $event, reply.userId)"
          @handleLike="$emit('handleLike', $event)"
          @handleReport="$emit('handleReport', $event)"
          @handleDelete="$emit('handleDelete', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  comment: Object,
  currentUserId: String,
  replyingToId: String,
  newReplyText: String,
});

const emits = defineEmits(['toggleReplyInput', 'handleReply', 'handleLike', 'handleReport', 'handleDelete']);
</script>

<style scoped>
.comment-item {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}
.comment-item:hover {
  background-color: #f1f1f1;
}
.comment-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}
.comment-user {
    font-weight: bold;
    color: #007bff;
    margin-right: 10px;
}
.my-comment-tag {
    background-color: #e50914;
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;
}
.comment-text {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 10px;
}
.comment-actions {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.comment-action {
  cursor: pointer;
  margin-right: 20px;
  transition: color 0.2s;
}
.comment-action:hover {
  color: #e50914;
}
.delete-action {
  color: #dc3545;
}
.delete-action:hover {
  color: #a71d2a;
}
.reply-input-area {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.comment-input {
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.comment-button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.comment-button:hover {
  background-color: #b20710;
}
.reply-list {
  margin-top: 15px;
  border-left: 2px solid #ddd;
  padding-left: 15px;
}
</style>