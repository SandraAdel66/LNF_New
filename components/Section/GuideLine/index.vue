<script setup lang="ts">
const { data: policies, status } = await useApiFetch(`/api/get-guide-line`, {
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

const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
    // Setup intersection observer to highlight current section
    if (process.client) {
        observer.value = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        const id = entry.target.id;
                        selectedSectionSlug.value = id;
                        router.replace({ hash: `#${id}` });
                    }
                });
            },
            {
                rootMargin: '-20% 0% -70% 0%',
                threshold: 0.5
            }
        );

        // Observe all section divs
        document.querySelectorAll('.section__div').forEach((section) => {
            observer.value?.observe(section);
        });
    }
});

onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect();
    }
});
</script>

<template>
    <div v-if="status !== 'pending' && (policies as Policy[]).length > 0">
        <div class="container my-5 px-6">
            <div class="flex lg:flex-row flex-col gap-8">
                <!-- LEFT SIDEBAR -->
                <div class="lg:w-1/4">
                    <div class="lg:sticky lg:top-24">
                        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 class="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-slate-200">
                                Policies & Guidelines
                            </h3>
                            <ul class="space-y-1">
                                <li 
                                    v-for="(section, index) in policies as Policy[]" 
                                    :key="section.id" 
                                    class="py-0.5"
                                >
                                    <NuxtLink
                                        :href="'#' + section.slug"
                                        type="button"
                                        :class="[
                                            isSectionActive(section, index) 
                                                ? 'active-section bg-primary/10 text-primary border-l-4 border-primary' 
                                                : 'text-gray-700 hover:text-primary hover:bg-gray-100',
                                            'side__nav font-medium px-4 py-3 rounded-lg transition-all duration-200 block w-full text-left whitespace-nowrap'
                                        ]"
                                        @click="selectedSectionSlug = section.slug"
                                    >
                                        <span class="font-medium text-sm lg:text-base">
                                            {{ section.title }}
                                        </span>
                                    </NuxtLink>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

                <!-- RIGHT CONTENT -->
                <div class="lg:w-3/4 lg:pl-8">
                    <div id="content-sections" class="space-y-12">
                        <template v-for="(section, index) in policies as Policy[]" :key="section.id">
                            <div 
                                :id="section.slug" 
                                class="section__div bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 scroll-mt-24"
                                :data-section-index="index"
                            >
                                <!-- Section Header -->
                                <div class="mb-8 pb-6 border-b border-gray-200">
                                    <div class="flex items-center gap-3 mb-3">
                                        <!-- numbering-->
                                        <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                                            {{ index + 1 }}
                                        </div>
                                        <h2 class="font-bold text-2xl md:text-3xl text-[#1A4480]">
                                            {{ section.title }}
                                        </h2>
                                    </div>
                                </div>

                                <!-- Section Content -->
                                <div class="prose prose-lg max-w-none text-[#1A4480]">
                                    <div v-html="section.description" />
                                </div>

                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.active-section {
    @apply opacity-100 font-semibold;
}

// Sticky sidebar styling
.lg\:sticky {
    position: sticky;
    top: 6rem;
    height: fit-content;
}

@media (max-width: 1023px) {
    .lg\:sticky {
        position: static;
    }
    
    .lg\:w-1\/4 {
        width: 100%;
    }
    
    .lg\:w-3\/4 {
        width: 100%;
        padding-left: 0;
    }
}

html {
    scroll-behavior: smooth;
}

.section__div {
    scroll-margin-top: 6rem;
}
.side__nav {
    &:hover, &.active-section {
        margin-left: -0.25rem;
        margin-right: -0.25rem;
        padding-left: calc(1rem + 0.25rem);
        padding-right: calc(1rem + 0.25rem);
    }
}
</style>