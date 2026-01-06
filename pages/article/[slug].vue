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
        <div class="container grid lg:grid-cols-12 gap-5 px-6 my-5 space-y-1.5 items-start">
            <div class="lg:col-span-8">
                <div class="text-normal font-xs">{{ (article as Article).publishDateFormatted }}</div>
                <div class="text-xl font-medium">{{ (article as Article).name }}</div>
                <div class="bg-slate-200 border my-1.5 rounded-lg overflow-hidden">
                    <NuxtImg :alt="(article as Article).name" :src="(article as Article).imageUrl" class="h-[25rem] w-full object-cover" />
                </div>
                <div class="lg:col-span-8 prose prose-slate prose-sm" v-html="(article as Article).des" />
            </div>
            <div class="lg:col-span-4">
                <SectionArticlesCarousel />
            </div>
        </div>
    </div>
</template>
