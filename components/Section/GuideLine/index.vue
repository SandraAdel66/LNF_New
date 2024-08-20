<script setup lang="ts">
const { data: policies, status } = await useApiFetch(`/api/get-policy`, {
    lazy: true,
    transform: (policies) => (policies as ApiResponse).data as Policy[],
});
const selectedSectionIndex = ref<number>(0);
const toggleSectionIndex = (index: number) => {
    selectedSectionIndex.value = index;
};
</script>
<template>
    <div v-if="policies && policies.length > 0" class="grid lg:grid-cols-12 gap-5 mb-8">
        <div class="lg:col-span-4 p-5 bg-slate-50 rounded-xl shadow-sm">
            <ul class="list-disc list-inside">
                <li v-for="(policy, index) in policies" :key="index">
                    <button
                        :disabled="selectedSectionIndex === index"
                        type="button"
                        :class="[selectedSectionIndex === index ? 'opacity-100 text-primary' : 'opacity-65', 'py-0.5 font-medium hover:text-primary']"
                        @click="toggleSectionIndex(index)"
                    >
                        <span class="">{{ policy.title }}</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="lg:col-span-8 prose prose-slate prose-sm">
            <div class="font-bold text-3xl">{{ policies[selectedSectionIndex].title }}</div>
            <div v-html="policies[selectedSectionIndex].description" />
        </div>
    </div>
</template>
