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
            <SectionAbout v-if="slug === 'about'" :sections="(page as Page).pageSections as PageSection[]" />
            <SectionGuideLine v-if="slug === 'membership'" />
            <SectionPolicy v-if="slug === 'policies'" />
            <SectionContactForm v-if="slug === 'contact'" />
            <SectionEvents v-if="slug === 'events'" :page="page as Page" />
            <SectionArticles v-if="slug === 'news'" />
        </div>
    </div>
</template>
