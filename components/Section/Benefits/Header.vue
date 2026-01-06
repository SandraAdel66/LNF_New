<script lang="ts" setup>
const props = defineProps<{
    benefit: Benefit;
}>();
</script>

<template>
    <div class="section-bg">
        <div class="container px-6 py-8 text-white flex flex-col gap-2">
            <div v-if="props.benefit.name" class="lg:text-3xl text-2xl font-semibold text-center" v-html="props.benefit.name" />
        </div>
    </div>
</template>
