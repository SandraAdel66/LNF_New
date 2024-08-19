<script setup lang="ts">
const route = useRoute();
const slug = ref(route.params.slug);

const { data: article, status } = await useApiFetch(`/api/get-article/${slug.value}`, {
    lazy: true,
    transform: (article) => (article as ApiResponse).data as Article,
});
</script>

<template>
    <div v-if="status !== 'pending'">
        <div class="bg-slate-200">
            <NuxtImg :src="(article as Article).imageUrl" class="h-[25rem] w-full object-cover" />
        </div>
        <div class="container px-6 my-5 space-y-1.5">
            <div class="opacity-75 text-light font-sm">{{ (article as Article).publishDateFormatted }}</div>
            <div class="text-xl font-medium">{{ (article as Article).name }}</div>
            <div class="lg:col-span-8 prose prose-slate" v-html="(article as Article).des" />
        </div>
    </div>
</template>
