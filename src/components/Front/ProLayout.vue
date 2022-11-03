<template>
      <section>
         <div class="container mx-auto px-8 my-8 lg:px-24 lg:my-24">
            <div
               class="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:gap-y-0 lg:grid-cols-3 lg:gap-x-8 text-center lg:text-left">
               <!-- square -->
               <Pro :pro="pro">
                  <ClockIcon class="w-8 h-8"></ClockIcon>
               </Pro>
               <Pro :pro="pro2">
                  <ClockIcon class="w-8 h-8"></ClockIcon>
               </Pro>
               <Pro :pro="pro3">
                  <ClockIcon class="w-8 h-8"></ClockIcon>
               </Pro>
               <!-- end square -->
            </div>
         </div>
      </section>
</template>

<script setup>
import { ClockIcon } from '@heroicons/vue/24/outline';
import Pro from '@/components/Front/Partial/Pro.vue'

const pro =
   { title: 'Lorem ipsum, dolor sit amet.', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Temporibus soluta aliquid quia sapientedeserunt, ratione vel esse necessitatibus,lorem' }
const pro2 =
   { title: 'Lorem ipsum, dolor sit amet.', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Temporibus soluta aliquid quia sapientedeserunt, ratione vel esse necessitatibus,lorem' }
const pro3 =
   { title: 'Lorem ipsum, dolor sit amet.', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Temporibus soluta aliquid quia sapientedeserunt, ratione vel esse necessitatibus,lorem' }
</script>