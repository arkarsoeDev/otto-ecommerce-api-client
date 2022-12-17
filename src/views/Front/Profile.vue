<template>
   <Breadcrumb>
      <BreadcrumbItem name="Profile" urlName="Profile" aria-current="page">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
   </Breadcrumb>
   <template v-if="!loading">
      <div class="mt-3 mb-9">
         <h1 class="text-4xl font-semibold">Profile</h1>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div>
            <div class="p-4 mb-6 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
               <h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">User Information</h5>
               <form ref="updateInfoForm" @submit.prevent="updateInfo">
                  <Input id="name" name="name" type="text" class="mb-4" v-model="user.name" placeholder="Name"
                     :errorMessage="infoErrors.name ? infoErrors.name[0] : false">Name</Input>
                  <Input id="phone" name="phone" type="text" class="mb-4" v-model="user.phone" placeholder="phone"
                     :errorMessage="infoErrors.phone ? infoErrors.phone[0] : false">phone</Input>
                  <Input id="email" name="email" type="email" class="mb-4" v-model="user.email" placeholder="Email"
                     :errorMessage="infoErrors.email ? infoErrors.email[0] : false">Email</Input>
                  <Input id="password" name="password" type="password" class="mb-4" v-model="user.password"
                     placeholder="Password"
                     :errorMessage="infoErrors.password ? infoErrors.password[0] : false">Password</Input>
                  <div class="w-3/5 sm:w-1/3 lg:w-5/12 ml-auto">
                     <Submit :submitting="submitting">
                        <template v-slot:icon>
                           <ArrowUpTrayIcon
                              class="h-5 w-5 text-white group-hover:text-gray-200 group-disabled:text-white"
                              aria-hidden="true" />
                        </template>
                        Save All
                     </Submit>
                  </div>
               </form>
            </div>
         </div>

         <div>
            <div class="p-4 mb-6 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
               <div class="flex flex-col h-full">
                  <div>
                     <h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Change Password
                     </h5>
                     <form id="changePasswordForm" ref="changePasswordForm" @submit.prevent="changePassword">
                        <Input id="current_password" type="password" name="current_password" class="mb-4"
                           v-model="password.current_password" placeholder="Current Password"
                           :errorMessage="changePasswordErrors.current_password ? changePasswordErrors.current_password[0] : false">Current
                        Password</Input>
                        <Input id="new_password" type="password" name="new_password" class="mb-4"
                           v-model="password.new_password" placeholder="New Password"
                           :errorMessage="changePasswordErrors.new_password ? changePasswordErrors.new_password[0] : false">New
                        Password</Input>
                        <Input id="new_password_confirmation" type="password" name="new_password_confirmation"
                           class="mb-4" v-model="password.new_password_confirmation" placeholder="Confirm New Password"
                           :errorMessage="changePasswordErrors.new_password_confirmation ? changePasswordErrors.new_password_confirmation[0] : false">Confirm
                        New
                        Password</Input>
                     </form>
                  </div>
                  <div class="w-3/5 sm:w-1/3 lg:w-5/12 ml-auto mt-auto">
                     <Submit form="changePasswordForm" :submitting="submitting">
                        <template v-slot:icon>
                           <ArrowUpTrayIcon
                              class="h-5 w-5 text-white group-hover:text-gray-200 group-disabled:text-white"
                              aria-hidden="true" />
                        </template>
                        Save All
                     </Submit>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div class="p-4 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
         <h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Billing Information</h5>
         <form ref="updateBillingInfoForm" @submit.prevent="updateBillingInfo">
            <Input id="address" name="address" class="mb-4" v-model="billingInfo.address" placeholder="address"
               :errorMessage="billingInfoErrors.address ? billingInfoErrors.address[0] : false">address</Input>
            <Input id="city" name="city" class="mb-4" v-model="billingInfo.city" placeholder="city"
               :errorMessage="billingInfoErrors.city ? billingInfoErrors.city[0] : false">city</Input>
            <Input id="state" name="state" class="mb-4" v-model="billingInfo.state" placeholder="state"
               :errorMessage="billingInfoErrors.state ? billingInfoErrors.state[0] : false">state</Input>
            <Input id="postal_code" name="postal_code" class="mb-4" v-model="billingInfo.postal_code"
               placeholder="postal_code"
               :errorMessage="billingInfoErrors.postal_code ? billingInfoErrors.postal_code[0] : false">postal_code</Input>
            <Input id="billing_password" name="password" class="mb-4" v-model="billingInfo.password"
               placeholder="password" :errorMessage="billingInfoErrors.password ? billingInfoErrors.password[0] : false">password</Input>
            <div class="w-3/5 sm:w-1/3 lg:w-2/12 ml-auto">
               <Submit :submitting="submitting">
                  <template v-slot:icon>
                     <ArrowUpTrayIcon class="h-5 w-5 text-white group-hover:text-gray-200 group-disabled:text-white"
                        aria-hidden="true" />
                  </template>
                  Save All
               </Submit>
            </div>
         </form>
      </div>

   </template>
   <template v-if="loading">
      <Loading></Loading>
   </template>
</template>

<script setup>
import Loading from '@/components/Front/Loading.vue';
import Breadcrumb from '@/components/Front/Breadcrumb.vue';
import Input from '@/components/Front/Form/Input.vue';
import Submit from '@/components/Front/Form/Submit.vue';
import BreadcrumbItem from '@/components/Front/Partial/BreadcrumbItem.vue';
import { ChevronLeftIcon, ArrowUpTrayIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

const userStore = useUserStore()
const appStore = useAppStore()
const loading = ref(false)
const user = ref({
   name: userStore.user.data.name,
   email: userStore.user.data.email,
   password: '',
})

const password = ref({
   current_password: '',
   new_password: '',
   new_password_confirmation: '',
})

const billingInfo = ref({ ...userStore.user.data.addresses[0] })

const updateInfoForm = ref()
const changePasswordForm = ref()
const updateBillingInfoForm = ref()
const infoErrors = ref({})
const changePasswordErrors = ref({})
const billingInfoErrors = ref({})
const submitting = ref(false)

const updateInfo = function () {
   submitting.value = true;
   let formData = new FormData(updateInfoForm.value)

   userStore.updateProfileInfo(formData, userStore.user.data.id)
      .then(res => {
         console.log(res)
         userStore.setUserData(res)
         appStore.addMessage({
            type: 'success',
            content: 'Profile is updated successfully!'
         })
         submitting.value = false
         infoErrors.value = {}
      })
      .catch(err => {
         console.log(err)
         infoErrors.value = err.response.data.errors
         submitting.value = false
      })
}

const changePassword = function () {
   submitting.value = true;
   let formData = new FormData(changePasswordForm.value)

   userStore.changePassword(formData, userStore.user.data.id)
      .then(res => {
         password.value = {}
         appStore.addMessage({
            type: 'success',
            content: 'Password is updated successfully!'
         })
         submitting.value = false
         changePasswordErrors.value = {}
      })
      .catch(err => {
         console.log(err)
         changePasswordErrors.value = err.response.data.errors
         submitting.value = false
      })
}

const updateBillingInfo = function () {
   submitting.value = true;
   let formData = new FormData(updateBillingInfoForm.value)

   userStore.updateBillingInfo(formData, userStore.user.data.id)
      .then(res => {
         console.log(res)
         appStore.addMessage({
            type: 'success',
            content: 'Billing Info is updated successfully!'
         })
         submitting.value = false
         billingInfoErrors.value = {}
      })
      .catch(err => {
         console.log(err)
         billingInfoErrors.value = err.response.data.errors
         submitting.value = false
      })
}
</script>