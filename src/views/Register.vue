<template>
   <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
         <div>
            <div class="text-center">
               <Logo></Logo>
            </div>
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register for free</h2>

         </div>
         <form class="mt-8 space-y-6" @submit.prevent="register">
            <input type="hidden" name="remember" value="true" />
            <Input id="name" name="name" type="text" class="mb-4" v-model="user.name" placeholder="Name"
               :errorMessage="errors.name ? errors.name[0] : false">Name</Input>
            <Input id="email" name="email" type="email" class="mb-4" v-model="user.email" placeholder="Email"
               :errorMessage="errors.email ? errors.email[0] : false">Email</Input>
            <Input id="password" name="password" type="password" class="mb-4" v-model="user.password" placeholder="Password"
               :errorMessage="errors.password ? errors.password[0] : false">Password</Input>
            <Input id="password_confirmation" name="password_confirmation" type="password" class="mb-4" v-model="user.password_confirmation" placeholder="Password Confirmation">Password Confirmation</Input>
            
            <div>
               <Submit :submitting="submitting">Register</Submit>
            </div>
         </form>
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';
import Input from '@/components/Front/Form/Input.vue';
import Submit from '@/components/Front/Form/Submit.vue';
import Logo from '@/components/Front/Partial/Logo.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const appStore = useAppStore();

const user = {
   name: '',
   email: '',
   password: '',
   password_confirmation: '',
}

const errors = ref({});
const submitting = ref(false)

function register() {
   submitting.value = true
   userStore.register(user)
      .then((res) => {
         appStore.addMessage({
            type: 'success',
            content: 'Registered Successfully!'
         })
         submitting.value = false
         router.push({ name: route.meta.previousRoute ?? 'Home' })
      }).catch(err => {
         errors.value = err.response.data.errors
         submitting.value = false
      })
}
</script>