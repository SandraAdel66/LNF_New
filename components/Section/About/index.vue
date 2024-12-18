<script setup lang="ts">
const props = defineProps<{
    sections: PageSection[];
}>();
const route = useRoute();
const router = useRouter();
const selectedSectionSlug = ref();

const { data: team, status } = await useApiFetch(`/api/get-team`, {
    lazy: true,
    transform: (team) => (team as ApiResponse).data as Team[],
});
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
    } else {
        // selectedSectionSlug.value = (page.value as Page)?.pageSections[0].slug;
    }
});

const isSectionActive = (section: PageSection, idx: number) => {
    if (route.hash) {
        const slugFromHash = route.hash.replace('#', '');
        return slugFromHash === section.slug;
    } else {
        return idx === 0;
    }
};
</script>
<template>
    <div v-if="props.sections && props.sections.length > 0">
        <div class="container my-5 px-6">
            <div class="flex lg:flex-row flex-col gap-5 mb-8">
                <div class="px-5 border-r border-slate-200 relative">
                    <ul class="list-disc list-inside sticky top-5">
                        <li v-for="(section, index) in props.sections" :key="index" class="py-2 whitespace-nowrap">
                            <NuxtLink
                                :href="'#' + section.slug"
                                type="button"
                                :class="[isSectionActive(section, index) ? 'active-section' : 'opacity-65', 'side__nav font-medium hover:text-primary']"
                            >
                                <span>{{ useStripHtml(section.title) }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div id="content-sections" class="prose prose-slate prose-sm space-y-8">
                    <template v-for="section in props.sections" :key="section.id">
                        <div :id="section.slug" class="section__div">
                            <div class="font-bold text-3xl">{{ useStripHtml(section.title) }}</div>
                            <div v-html="section.description" />
                        </div>
                    </template>

                    <div v-if="status !== 'pending'" class="mt-5 grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                        <div class="lg:col-span-3 md:col-span-2 font-bold text-3xl my-1.5">LNF Board Members</div>
                        <div v-for="member in team as Team[]" :key="member.id" class="intro-x bg-slate-50 overflow-hidden border border-slate-100 shadow-sm rounded-xl">
                            <NuxtImg class="m-0 w-full h-52 object-cover object-top" :src="member.imageUrl" :alt="member.name" :title="member.name + ' - ' + member.title" />
                            <div class="px-5 pt-2 pb-2">
                                <div class="font-semibold">{{ member.name }}</div>
                                <div class="text-xs font-light">{{ member.title }}</div>
                                <div class="text-xs font-medium">{{ member.network }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.active-section {
    @apply opacity-100 text-primary font-semibold;
}
</style>
