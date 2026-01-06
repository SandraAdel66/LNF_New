<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        backgroundImageSrc: string;
        wide: boolean | null;
    }>(),
    {
        backgroundImageSrc: '',
        wide: false,
    },
);
</script>

<template>
    <div :class="[!props.wide ? 'container' : 'w-full', 'px-6 ', 'py-16 relative']" :style="{ backgroundImage: `url(${props.backgroundImageSrc})` }">
        <div :class="[props.wide && 'container']">
            <slot />
        </div>
    </div>
</template>
