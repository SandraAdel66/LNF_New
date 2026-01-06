<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        wide: boolean;
    }>(),
    {
        wide: false,
    },
);
</script>

<template>
    <div :class="[props.wide ? '' : 'container 2xl:rounded-t-3xl 2xl:-mt-8  2xl:p-5 p-2 bg-gradient-to-b from-white via-white to-slate-100', '']">
        <slot />
    </div>
</template>
