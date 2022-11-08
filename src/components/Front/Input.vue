<template>
   <div>
      <label :for="id" class="block mb-2 font-semibold"><slot></slot></label>
      <input :id="id" :name="name" :type="type" class="form-input w-full px-4 py-1" :value="modelValue" v-model="modelValue" @input="$emit('update:modelValue',$event.target.value)">
   </div>
</template>

<script setup>
defineProps({
   id: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      default: "text",
   },
   modelValue: {
      type: String,
   }
})

defineEmits(['update:modelValue'])
</script>