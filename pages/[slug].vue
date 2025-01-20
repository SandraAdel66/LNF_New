<script lang="ts" setup>
const route = useRoute();
const slug = ref(route.params.slug);

const { data: page, status } = await useApiFetch(`/api/get-page/${slug.value}`, {
    lazy: true,
    transform: (page) => (page as ApiResponse).data as Page,
});

useSeoMeta({
    title: (page.value as Page)?.name,
    description: (page.value as Page)?.des,
});
</script>

<template>
    <div v-if="status !== 'pending'">
        <div class="container my-5 px-6">
            <div class="pl-5 border-l-4 border-primary">
                <div v-if="(page as Page).name && (page as Page).des" class="leading-5 text-xl font-semibold text-justify text-primary" v-html="(page as Page).name" />
                <div v-if="(page as Page).name && (page as Page).des" class="leading-5 text-justify mt-1.5" v-html="(page as Page).des" />
            </div>

            <SectionAbout v-if="slug === 'about'" :sections="(page as Page).pageSections as PageSection[]" />
            <SectionGuideLine v-if="slug === 'membership'" />
            <SectionPolicy v-if="slug === 'policies'" />
            <SectionTOS v-if="slug === 'terms-and-conditions'" />
            <SectionFaq v-if="slug === 'faq'" />
            <SectionContactForm v-if="slug === 'contact'" />
            <SectionEvents v-if="slug === 'events'" :page="page as Page" />
            <SectionArticles v-if="slug === 'news'" />
        </div>
    </div>
</template>
