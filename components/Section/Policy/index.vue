<script setup lang="ts">
const { data: policies, status } = await useApiFetch(`/api/get-policy`, {
    lazy: true,
    transform: (policies) => (policies as ApiResponse).data as Policy[],
});

const route = useRoute();
const router = useRouter();
const selectedSectionSlug = ref();

async function setCurrentSection(currentSectionSlugHash: string) {
    await router.push({ path: route.path, hash: '#' + currentSectionSlugHash });
    await navigateTo('/about#' + currentSectionSlugHash);
}

watch(selectedSectionSlug, async (newSlug) => {
    await router.push({ path: route.path, hash: `#${newSlug}` });
});

onMounted(async () => {
    if (route.hash) {
        selectedSectionSlug.value = route.hash.replace('#', '');
        await setCurrentSection(selectedSectionSlug.value);
    }
});

const isSectionActive = (section: Policy, idx: number) => {
    if (route.hash) {
        const slugFromHash = route.hash.replace('#', '');
        return slugFromHash === section.slug;
    } else {
        return idx === 0;
    }
};
</script>
<template>
    <div v-if="status !== 'pending' && (policies as Policy[]).length > 0">
        <div class="container my-5 px-6">
            <div class="flex lg:flex-row flex-col gap-5 mb-8">
                <div class="px-5 border-r border-slate-200 relative">
                    <ul class="list-disc list-inside sticky top-5">
                        <li v-for="(section, index) in policies as Policy[]" :key="index" class="py-2 whitespace-nowrap">
                            <NuxtLink
                                :href="'#' + section.slug"
                                type="button"
                                :class="[isSectionActive(section, index) ? 'active-section' : 'opacity-65', 'side__nav font-medium hover:text-primary']"
                            >
                                <span>{{ section.title }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div id="content-sections" class="prose prose-slate prose-sm space-y-8">
                    <template v-for="section in policies" :key="section.id">
                        <div :id="section.slug" class="section__div">
                            <div class="font-bold text-3xl">{{ section.title }}</div>
                            <div v-html="section.description" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
