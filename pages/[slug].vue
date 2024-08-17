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
        <PageHeader :page="page as Page" />
        <ApplicationWarning />
        <PageContainer :wide="slug === 'events-conferences' || slug === 'incoterms'">
            <template v-if="(page as Page).pageSections.length > 0">
                <template v-for="section in (page as Page).pageSections as PageSection[]" :key="section.id">
                    <SectionContainer
                        :background-image-src="section.image ? section.imageUrl : ''"
                        :class="[
                            section.type === 'benefits-grid' && '!bg-primary',
                            section.type === 'site-states' && '!bg-slate-100',
                            section.type === 'benefits-list' && '!py-0',
                            'intro-x',
                            section.type === 'intro' && 'bg-white bg-center bg-contain bg-no-repeat',
                            section.type === 'network-directory' && 'bg-white bg-center bg-contain bg-no-repeat',
                            section.type === 'image-banner-section' && 'bg-top bg-contain bg-white bg-no-repeat',
                        ]"
                        wide
                    >
                        <Section :section="section" />
                    </SectionContainer>
                </template>
            </template>
        </PageContainer>
    </div>
</template>
