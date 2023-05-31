<template>
    <div>
      <div>
        <div class="overflow-x-auto w-full">
          <table class="table w-full">
            <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>이름</th>
              <th>댓글</th>
              <th>날짜</th>
              <th></th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="comment in comments" :key="comment.commentId">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                  </div>
                  <div>
                    <div class="font-bold">{{comment.studentName}}</div>
                    <div class="text-sm opacity-50"></div>
                  </div>
                </div>
              </td>
              <td>
                {{comment.content}}
                <br/>
              </td>
              <td>{{comment.createdDate}}</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            </tbody>

            <tfoot>
            <tr>
              <th></th>
              <th>이름</th>
              <th>댓글</th>
              <th>날짜</th>
              <th></th>
            </tr>
            </tfoot>

          </table>
        </div>
        </div>
      </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {getCommentList} from "../api/comment.js"

const comments = ref("");

onBeforeMount(async () => {
  const response = await getCommentList();
  console.log(response.data)
  comments.value = response.data.commentList
  console.log(response.data.commentList.picture)

});
</script>

<style scoped>

</style>
