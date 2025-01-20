<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <div class="grid lg:grid-cols-12 items-start justify-between gap-5">
        <template v-if="props.section.type === 'about-right-image' || props.section.type === 'about-left-image'">
            <div :class="[props.section.type === 'about-right-image' && 'order-last', 'lg:col-span-5']">
                <NuxtImg
                    v-if="props.section.image"
                    :alt="props.section.title"
                    :src="props.section.imageUrl"
                    :title="props.section.title"
                    class="object-contain w-full h-full hover:scale-105 transition-all"
                />
            </div>
            <div class="h-full lg:col-span-7">
                <div v-if="props.section.title" class="text-2xl font-bold text-primary" v-html="props.section.title" />
                <div v-if="props.section.description" class="text-lg font-light mt-3 text-justify" v-html="props.section.description" />
            </div>
        </template>
        <div v-else-if="props.section.type === 'about-no-image'" class="lg:col-span-12">
            <div v-if="props.section.title" class="text-2xl font-bold text-primary text-center" v-html="props.section.title" />
            <div v-if="props.section.description" class="text-lg font-light mt-3 text-justify-center" v-html="props.section.description" />
        </div>
    </div>
</template>
