<template>
   <div class="flex flex-col p-3 mb-3 md:block">
      <span class="block mb-2 font-bold">{{ capitalize(name) }}</span>
      <slot></slot>
   </div>
</template>

<script setup>
import { capitalize } from 'vue';

defineProps({
   name: {
      default: "Name"
   }
})
</script>