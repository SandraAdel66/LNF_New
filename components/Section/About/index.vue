<script setup lang="ts">
defineProps<{
    sections: PageSection[];
}>();
const selectedSectionIndex = ref<number>(0);
const toggleSectionIndex = (index: number) => {
    selectedSectionIndex.value = index;
};

const { data: team, status } = await useApiFetch(`/api/get-team`, {
    lazy: true,
    transform: (team) => (team as ApiResponse).data as Team[],
});
</script>
<template>
    <div v-if="sections && sections.length > 0" class="grid lg:grid-cols-12 gap-5 mb-8">
        <div class="lg:col-span-3 p-5 bg-slate-50 rounded-lg shadow-sm">
            <ul class="list-disc list-inside">
                <li v-for="(section, index) in sections" :key="index">
                    <button
                        :disabled="selectedSectionIndex === index"
                        type="button"
                        :class="[selectedSectionIndex === index ? 'opacity-100 text-primary font-semibold' : 'opacity-65', 'py-2 font-medium hover:text-primary']"
                        @click="toggleSectionIndex(index)"
                    >
                        <span>{{ section.title }}</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="lg:col-span-9 prose prose-slate prose-sm">
            <div class="font-bold text-3xl">{{ sections[selectedSectionIndex].title }}</div>
            <div v-html="sections[selectedSectionIndex].description" />
            <template v-if="sections[selectedSectionIndex].title === 'Board Team'">
                <div v-if="status !== 'pending'" class="mt-5 grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                    <div class="lg:col-span-3 md:col-span-2 font-bold text-3xl my-1.5">LNF Board Members</div>
                    <div class="intro-x bg-slate-50 overflow-hidden border border-slate-100 shadow-sm rounded-xl" v-for="member in team as Team[]" :key="member.id">
                        <NuxtImg class="m-0 w-full h-52 object-cover" :src="member.imageUrl" :alt="member.name" :title="member.name + ' - ' + member.title" />
                        <div class="px-5 pt-2 pb-2">
                            <div class="font-semibold">{{ member.name }}</div>
                            <div class="text-xs font-light">{{ member.title }}</div>
                            <div class="text-xs font-medium">{{ member.network }}</div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
