<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        title: string | undefined;
        description: string | undefined;
        wide: boolean;
    }>(),
    {
        title: undefined,
        description: undefined,
        wide: false,
    },
);
</script>
<template>
    <div :class="[!props.wide && ' px-6', 'flex flex-col gap-3']">
        <div class="rounded-2xl border p-5 bg-white/75 transition-all">
            <div class="pb-2 mb-2 border-b border-dashed">
                <div v-if="props.title" class="font-normal" v-html="props.title" />
                <div v-if="props.description" class="font-light text-sm" v-html="props.description" />
            </div>
            <slot />
        </div>
    </div>
</template>
