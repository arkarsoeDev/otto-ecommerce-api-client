<template>
   <router-link :to="{name:urlPath}" class="block px-3 py-2 transition-colors hover:text-black hover:bg-slate-300" :class="{ 'bg-slate-300 shadow text-black' : isActive}"><slot></slot></router-link>
</template>
<script>
export default {
   props: ['isActive','urlPath']
}
</script>