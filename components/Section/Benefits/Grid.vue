<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
const resources = useResourceStore();
</script>

<template>
    <div class="relative">
        <div class="text-center max-w-4xl mx-auto text-white">
            <div v-if="props.section.title" class="text-3xl lg:text-4xl font-bold text-white" v-html="props.section.title" />
            <div v-if="props.section.description" class="text-lg font-light opacity-85 mt-3" v-html="props.section.description" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div v-for="benefit in resources.benefits as Benefit[]" :key="benefit.id" class="intro-x">
                <SectionBenefitsCard :benefit="benefit" />
            </div>
        </div>
    </div>
</template>
