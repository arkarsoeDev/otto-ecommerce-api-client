<template>
   <div>
      <div @click="toggleCollapse(event, 'category')" id="category"
         class="collapse-toggle block p-3 uppercase relative hover:cursor-pointer select-none">
         Category
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 absolute top-[50%] -translate-y-1/2 right-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
         </svg>
      </div>
      <div class="collapse-menu select-none overflow-hidden h-0 transition-[height] ease-in-out" data-target="category">
         <div>
            <div v-for="(category, index) in categories" :key="index" class="pl-5 py-2 text-gray-500">
               <a href="#" @click.prevent="filterCat({type:'category',key:{category:category.slug}})" class="hover:text-black" :class="{'text-black font-bold': shopStore.activeCategory && category.slug === shopStore.activeCategory.key.category}">{{ category.title }}</a>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { useShopStore } from '@/stores/shop';

const toggleCollapse = function (event, target) {
   let collapseMenu = document.querySelector(
      `.collapse-menu[data-target="${target}"]`
   );
   if (!collapseMenu.clientHeight) {
      collapseMenu.style.height = `${collapseMenu.firstElementChild.clientHeight}px`;
   } else {
      collapseMenu.style.height = 0;
   }
   collapseMenu.classList.toggle("h-0");
}

const { categories } = defineProps(['categories'])
const emit = defineEmits(['filterCat'])
const shopStore = useShopStore();

const filterCat = function (category) {
   emit('filterCat',category)
}
</script>