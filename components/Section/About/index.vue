<script setup lang="ts">
defineProps<{
    sections: PageSection[];
}>();
const selectedSectionIndex = ref<number>(0);
const toggleSectionIndex = (index: number) => {
    selectedSectionIndex.value = index;
};
</script>
<template>
    <div v-if="sections && sections.length > 0" class="grid lg:grid-cols-12 gap-5 mb-8">
        <div class="lg:col-span-3 p-5 bg-slate-50 rounded-xl border border-slate-200/75 shadow-sm">
            <ul class="list-disc list-inside">
                <li v-for="(section, index) in sections" :key="index">
                    <button
                        :disabled="selectedSectionIndex === index"
                        type="button"
                        :class="[selectedSectionIndex === index ? 'opacity-100 text-primary font-semibold' : 'opacity-65', 'py-0.5 font-medium hover:text-primary']"
                        @click="toggleSectionIndex(index)"
                    >
                        <span>{{ section.title }}</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="lg:col-span-9 prose prose-slate prose-sm">
            <div v-html="sections[selectedSectionIndex].description" />
        </div>
    </div>
</template>
