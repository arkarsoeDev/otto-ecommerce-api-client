<template>
   <form @submit.prevent="submit" class="w-full sm:w-auto">
      <div class="flex items-center">
         <input type="text" class="grow  h-[45px] form-input px-3 py-1 mr-2 sm:grow-0" :value="modelValue"
            placeholder="search" @input="$emit('update:modelValue', $event.target.value)">
         <button type="submit" class="p-1 border border-gray-800 h-[45px]">
            <MagnifyingGlassIcon class="w-7 h-5"></MagnifyingGlassIcon>
         </button>
      </div>
   </form>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

defineProps({
   modelValue: {
      type: String,
   },
})

const emit = defineEmits(['fetchPayload', 'update:modelValue'])

const submit = function () {
   emit('fetchPayload')
}
</script>

<style lang="scss" scoped>

</style>