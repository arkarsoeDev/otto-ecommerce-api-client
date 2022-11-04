<template>
   <nav aria-label="Breadcrumb">
      <div class="container px-8 my-8 mx-auto lg:px-24">
         <ul class="inline-flex items-center space-x-1 md:space-x-3">
            <BreadcrumbItem name="Home" urlName="Home"><HomeIcon class="w-4 h-4"></HomeIcon></BreadcrumbItem>
            <slot></slot>
         </ul>
      </div>
   </nav>
</template>

<script setup>
import BreadcrumbItem from './Partial/BreadcrumbItem.vue';
import { HomeIcon } from '@heroicons/vue/20/solid';

</script>