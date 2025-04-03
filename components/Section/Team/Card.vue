<script lang="ts" setup>
defineProps<{
    member: Team;
}>();
</script>

<template>
    <div class="intro-x overflow-hidden ">
        <!-- Image with responsive height -->
        <NuxtImg 
            class="m-0 w-full sm:h-60 md:h-55 sm:object-contain object-cover object-top" 
            :src="member.imageUrl" 
            :alt="member.name" 
            :title="member.name + ' - ' + member.title" 
        />
        
        <!-- Member Info -->
        <div class="px-4 sm:px-5 pt-3 pb-3 text-center leading-tight space-y-1">
            <div class="text-sm sm:text-base font-semibold text-white">{{ member.name }}</div>
            <div class="text-xs sm:text-sm font-light text-gray-300">{{ member.title }}</div>
            <div class="text-xs sm:text-sm font-medium text-gray-400">{{ member.network }}</div>
        </div>
    </div>
</template>
