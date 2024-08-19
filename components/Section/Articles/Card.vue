<script lang="ts" setup>
defineProps<{
    data: Article;
}>();
</script>

<template>
    <NuxtLink :href="'/article/' + data.slug" class="hover:scale-105 ease-in-out duration-300 bg-white rounded-lg overflow-hidden border border-slate-200/75">
        <NuxtImg :src="data.imageUrl" :alt="data.name" class="h-44 w-full object-cover" />
        <div class="p-5 space-y-1">
            <div class="text-xs font-light">{{ data.publishDateFormatted }}</div>
            <div class="font-medium line-clamp-2">{{ data.name }}</div>
            <div class="line-clamp-3 text-sm font-light">{{ data.shortDes }}</div>
        </div>
    </NuxtLink>
</template>
