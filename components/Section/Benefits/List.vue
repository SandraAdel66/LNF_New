<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
const resources = useResourceStore();
</script>

<template>
    <div class="relative">
        <div class="text-center max-w-4xl mx-auto text-white">
            <div v-if="props.section.title" class="md:text-4xl lg:text-5xl font-bold" v-html="props.section.title" />
            <div v-if="props.section.des" class="text-lg font-light opacity-85 mt-3" v-html="props.section.des" />
        </div>
        <div class="flex flex-col gap-5">
            <div v-for="benefit in resources.benefits as Benefit[]" :key="benefit.id" class="intro-x">
                <SectionBenefitsCard :benefit="benefit" type="list" />
            </div>
        </div>
    </div>
</template>
