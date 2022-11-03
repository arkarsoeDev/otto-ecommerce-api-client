<template>
   <div class="flex flex-col items-center max-w-xs mx-auto p-4 border-2 border-slate-500 bg-gray-50">
      <div class="p-2 mb-3 border-2 border-slate-500">
         <slot></slot>         
      </div>
   
      <h2 class="text-2xl font-semibold text-center">
         {{ pro.title }}
      </h2>
      <hr class="my-3 border-1 w-full border-black" />
      <p>
         {{ pro.description }}
      </p>
   </div>
</template>

<script>
   export default {
      props: ['pro']
   }
</script>