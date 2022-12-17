<template>
   <Menu as="div" class="relative flex text-left" v-slot="{ open }">

      <MenuButton class="inline-block pr-3 mr-3 border-slate-900 border-r-2">
         <UserIcon class="text-slate-900 w-5 h-5 lg:w-6 lg:h-6 hover:fill-slate-200" :class="{ 'fill-slate-200': open }"
            aria-hidden="true"></UserIcon>
      </MenuButton>


      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
         enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
         leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
         <MenuItems
            class="absolute right-0 top-[180%] w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="px-1 py-1">
               <MenuItem v-slot="{ active }">
               <router-link :to="{ name: 'Profile' }" :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
               ]">
                  <ClipboardDocumentIcon :active="active" class="mr-2 h-5 w-5" aria-hidden="true">
                  </ClipboardDocumentIcon>
                  Profile
               </router-link>
               </MenuItem>
               <MenuItem v-slot="{ active }">
               <router-link :to="{ name: 'Orders' }" :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
               ]">
                  <ClipboardDocumentIcon :active="active" class="mr-2 h-5 w-5" aria-hidden="true">
                  </ClipboardDocumentIcon>
                  Orders
               </router-link>
               </MenuItem>
               <MenuItem v-slot="{ active }">
               <button @click="logout" :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
               ]">
                  <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-3" />
                  <span>Logout</span>
               </button>
               </MenuItem>

            </div>
         </MenuItems>
      </transition>
   </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ArrowLeftOnRectangleIcon, UserIcon, ClipboardDocumentIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const logout = function () {
   userStore.logout();
}
</script>
