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
    <section class="py-8">
        <div class="text-center max-w-4xl mx-auto pt-8 px-4">
            <div v-if="props.section.postTitle" class="text-lg font-medium" v-html="props.section.postTitle" />
            <div v-if="props.section.title" class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary" v-html="props.section.title" />
            <div v-if="props.section.description" class="text-lg sm:text-xl font-light mt-3 text-center" v-html="props.section.description" />
        </div>
        
        <ul v-if="status !== 'pending'" class="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 px-4 sm:px-6 lg:px-8 py-5 mt-5 gap-6 place-content-center items-center">
           <li v-for="network in networkLogos as Network[]" :key="network.link" class="intro-x">
    <div class="flex flex-col items-center gap-2 text-center ease-in-out duration-300">
        <a :href="network.link" target="_blank" rel="noopener noreferrer" class="block w-full">
            <NuxtImg 
                :src="network.imageUrl" 
                :title="network.name" 
                :alt="network.name" 
                class="w-full object-contain h-14 sm:h-16 md:h-20 mx-auto rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
            />
        </a>
    </div>
</li>
        </ul>
    </section>
</template>
