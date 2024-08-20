<script lang="ts" setup>
defineProps<{
    member: Team;
}>();
</script>

<template>
    <div class="intro-x bg-slate-50 overflow-hidden border border-slate-100 shadow-sm rounded-xl">
        <NuxtImg class="m-0 w-full h-24 object-cover" :src="member.imageUrl" :alt="member.name" :title="member.name + ' - ' + member.title" />
        <div class="px-5 pt-2 pb-2 text-center leading-tight space-y-1">
            <div class="text-xs font-semibold">{{ member.name }}</div>
            <div class="text-xs font-light">{{ member.title }}</div>
            <div class="text-xs font-medium truncate">{{ member.network }}</div>
        </div>
    </div>
</template>
