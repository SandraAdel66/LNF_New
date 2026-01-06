<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        country: Country;
        size: 'xs' | 'sm' | 'base' | 'lg';
    }>(),
    {
        size: 'sm',
    },
);
</script>

<template>
    <div class="flex items-center gap-3">
        <NuxtImg :alt="props.country.name" :src="props.country.imageUrl" :title="props.country.name" class="w-6 h-4 rounded-sm" />
        <div :class="'text-' + props.size">{{ props.country.name }}</div>
    </div>
</template>
