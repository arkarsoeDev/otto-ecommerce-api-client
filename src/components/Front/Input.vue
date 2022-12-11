<template>
   <div>
      <label :for="id" class="block mb-2 text-sm font-medium" :class="{ 'text-red-700 dark:text-red-500': errorMessage }">
         <slot></slot>
      </label>
      <input :id="id" :name="name" :type="type"
         class="text-sm border w-full p-2.5 block" :class="{'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500  dark:text-red-500 dark:placeholder-red-500 dark:border-red-500':errorMessage}"
         :value="modelValue" v-model="modelValue" :placeholder="placeholder" @input="$emit('update:modelValue', $event.target.value)">
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium"></span>{{ errorMessage }}</p>
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
   placeholder: {
      type: String,
      default: '',
   },
   type: {
      type: String,
      default: "text",
   },
   modelValue: {
      type: String,
   },
   errorMessage: {
      default: false
   }
})

defineEmits(['update:modelValue'])
</script>