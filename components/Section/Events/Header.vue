<script lang="ts" setup>
const props = defineProps<{
    event: Exhibition;
}>();
console.log('You are in Event Header Section ');
</script>

<template>
    <div class="section-bg">
        <div class="container px-6 md:px-12 py-8 text-white flex flex-col gap-3">
            <div v-if="props.event.title" class="lg:text-3xl text-2xl font-semibold text-center" v-html="props.event.title" />
        </div>
    </div>
</template>
