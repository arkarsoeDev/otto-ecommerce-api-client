<template>
   <li class="inline-flex items-center">
      <router-link v-if="route.name !== urlName" :to="{name: urlName}"
         class="inline-flex items-center text-sm font-medium text-gray-700 h-full    hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
         <slot></slot>
         <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ name }}</span>
      </router-link>

      <div v-else :to="{name: urlName}"
         class="inline-flex items-center text-sm font-medium text-gray-700 h-full    hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
         <slot></slot>
         <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ name }}</span>
      </div>
   </li>
</template>

<script setup>
import { useRoute } from 'vue-router';

const { name, urlName } = defineProps(['name', 'urlName'])
const route = useRoute();
</script>