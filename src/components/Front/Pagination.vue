<template>
   <nav aria-label="Page navigation example">
      <ul class="flex justify-between" v-if="mobile">
         <li>
            <PaginationItem @click.prevent="go(links.prev)"
               :link="{active : false, url:links.prev, label: 'Prev'}">
            </PaginationItem>
         </li>
         <li>
            <PaginationItem @click.prevent="go(links.next)" :link="{active: false, url:links.next, label: 'Next'}">
            </PaginationItem>
         </li>
      </ul>
      <ul class="inline-flex -space-x-px" v-else>
         <li v-for="(link, index) in links" :key="index">
            <PaginationItem @click.prevent="go(link.url)" :prev="index === 0" :next="index === links.length - 1" :link="link">
            </PaginationItem>
         </li>
      </ul>
   </nav>
</template>

<script setup>
import PaginationItem from './Partial/PaginationItem.vue';

const { links, mobile } = defineProps(['links','mobile'])
const emit = defineEmits(['fetchLink'])

const go = function (url) {
   if (url) {
      emit('fetchLink', url)
   }
}
</script>