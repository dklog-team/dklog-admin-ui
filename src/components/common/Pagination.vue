<template>
    <div class="flex justify-center mt-10">
        <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <!-- 이전 페이지 존재 -->
                <a v-if="pagingUtil.startPage == pagingUtil.pageNumber && !pagingUtil.existPrePageGroup"
                   class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </a>
                <a v-else
                   @click="clickPrePageGroup"
                   class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </a>
                <!-- 페이지 번호 -->
                <span v-for="page in props.pagingUtil.endPage +1-props.pagingUtil.startPage " :key="page + pagingUtil.startPage">
                        <a v-if="pagingUtil.pageNumber == page + pagingUtil.startPage - 1"
                           @click="clickPage(page + pagingUtil.startPage - 1)"
                           class="relative z-10 inline-flex items-center bg-[#f9d72f] px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
                            {{ page + pagingUtil.startPage - 1}}
                        </a>
                        <a v-else aria-current="page"
                           @click="clickPage(page + pagingUtil.startPage - 1)"
                           class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            {{ page + pagingUtil.startPage - 1}}
                        </a>
                </span>
                <!-- 다음 페이지 존재 -->
                <a v-if="pagingUtil.endPage == pagingUtil.pageNumber && !pagingUtil.existNextPageGroup"
                   class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </a>
                <a v-else
                   @click="clickNextPageGroup"
                   class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </a>
            </nav>
        </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps({
    pagingUtil: Object
})

const emit = defineEmits(["changePage"]);

const clickPage = (page) => {
    emit('changePage', page)
}

const clickPrePageGroup = () => {
    emit('changePage', props.pagingUtil.pageNumber - 1)
}

const clickNextPageGroup = () => {
    emit('changePage', props.pagingUtil.pageNumber + 1)
}

</script>

<style scoped>

</style>
