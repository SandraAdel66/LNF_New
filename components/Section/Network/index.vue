<script lang="ts" setup>
const { data: networkLogos, status } = await useApiFetch(`/api/get-logo-company/public`, {
    lazy: true,
    transform: (networkLogos) => (networkLogos as ApiResponse).data as Network[],
});
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <section class="py-8 ">
        <div class="text-center max-w-4xl mx-auto pt-8">
            <div v-if="props.section.postTitle" class="text-lg font-medium" v-html="props.section.postTitle" />
            <div v-if="props.section.title" class="text-3xl lg:text-4xl font-bold text-primary" v-html="props.section.title" />
            <div v-if="props.section.description" class="text-xl font-light mt-3 text-justify-center" v-html="props.section.description" />
        </div>
        <ul v-if="status !== 'pending'" class="container grid grid-cols-7 px-6 py-5 mt-5 gap-8 p-5 place-content-center items-center">
            <li v-for="network in networkLogos as Network[]" :key="network.name" class="intro-x">
                <div class="flex flex-col flex-wrap gap-2 text-center ease-in-out duration-300">
                    <NuxtImg :src="network.imageUrl" :title="network.name" :alt="network.name" class="w-full object-contain h-14 shrink-0 mx-auto rounded-lg" />
                </div>
            </li>
        </ul>
    </section>
</template>
