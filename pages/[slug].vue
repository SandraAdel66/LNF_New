<script lang="ts" setup>
import ContactForm from '~/components/Section/ContactForm.vue';

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
    <div v-if="status !== 'pending'" class="bg-slate-50">
        <PageHeader :page="page as Page" />
        <div class="container my-8 px-6">
            <SectionAbout v-if="slug === 'about'" :sections="(page as Page).pageSections as PageSection[]" />
            <SectionGuideLine v-if="slug === 'membership'" />
            <SectionContactForm v-if="slug === 'contact'" />
            <SectionEvents v-if="slug === 'events'" />
        </div>
    </div>
</template>
