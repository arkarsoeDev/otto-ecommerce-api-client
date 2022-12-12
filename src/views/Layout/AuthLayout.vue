<template>
   <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import { watch } from 'vue';
import { useAppStore } from '../../stores/app';
import Swal from 'sweetalert2';


const appStore = useAppStore();

watch(() => appStore.message, (newValue, oldValue) => {
   if (newValue) {
      showToast(newValue)
   }
}, { deep: true })

const showToast = function (message) {
   const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
         toast.addEventListener('mouseenter', Swal.stopTimer)
         toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
   })

   Toast.fire({
      icon: message.type,
      title: message.content
   })
}

</script>