<template>
   <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
         <div>
            <div class="text-center">
               <Logo></Logo>
            </div>
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
               <router-link :to="{ name: 'Register' }"
                  class="font-medium text-lg text-indigo-600 hover:text-indigo-500">Don't have an account ?
               </router-link>
            </p>
         </div>
         <form class="mt-8 space-y-6" @submit.prevent="login">
            <input type="hidden" name="remember" value="true" />
            <Input id="email" name="email" type="email" class="mb-4" v-model="user.email" placeholder="Email"
               :errorMessage="errors.email ? errors.email[0] : false">Email</Input>
            <Input id="password" name="password" type="password" class="mb-4" v-model="user.password"
               placeholder="Password" :errorMessage="errors.password ? errors.password[0] : false">Password</Input>
            <div>
               <Submit :submitting="submitting">Sign In</Submit>
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

const userStore = useUserStore();
const appStore = useAppStore();
const route = useRoute()
const router = useRouter()

const user = {
   email: '',
   password: '',
}

const errors = ref({});
const submitting = ref(false)

function login() {
   submitting.value = true
   userStore.login(user)
      .then((data) => {
         appStore.addMessage({
            type: 'success',
            content: 'Login Successfully!'
         })
         submitting.value = false
         router.push({ name: route.meta.previousRoute ?? 'Home' })
      }).catch(error => {
         errors.value = error.response.data.errors
         submitting.value = false
      })
}
</script>