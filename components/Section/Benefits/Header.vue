<script lang="ts" setup>
const props = defineProps<{
    benefit: Benefit;
}>();
</script>

<template>
    <div class="section-bg">
        <div class="container px-6 py-12 text-white flex flex-col gap-2">
            <SectionBenefitsIcon
                :icon-name="props.benefit.icon"
                class="mx-auto h-20 w-20 p-1 -mt-1 mb-2 group-hover:rotate-[360deg] ease-in-out duration-1000"
                color-one="text-warning"
                color-two="text-white"
            />
            <div v-if="props.benefit.name" class="lg:text-4xl text-2xl font-semibold text-center" v-html="props.benefit.name" />
        </div>
    </div>
</template>
