<script lang="ts" setup>
const props = defineProps<{
    page: Page | any;
}>();
</script>

<template>
    <div class="section-bg">
        <div :class="[props.page.des !== null ? 'pt-8 min-h-36 ' : 'py-8', '2xl:pb-16 pb-8 container px-6 md:px-12 text-white flex flex-col gap-3']">
            <div v-if="props.page.name" class="lg:text-4xl text-2xl font-semibold text-center" v-html="props.page.name" />
            <div v-if="props.page.des" class="text-base font-light text-justify-center" v-html="props.page.des" />
        </div>
    </div>
</template>
