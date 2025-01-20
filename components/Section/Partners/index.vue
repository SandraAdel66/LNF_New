<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();

const { data: partners, status } = await useApiFetch(`/api/partner-public`, {
    lazy: true,
    transform: (partners) => (partners as ApiResponse).data as Partner[],
});
</script>

<template>
    <div>
        <div class="text-center max-w-4xl mx-auto py-8">
            <div v-if="props.section.postTitle" class="text-lg font-medium" v-html="props.section.postTitle" />
            <div v-if="props.section.title" class="text-3xl lg:text-4xl font-bold text-primary" v-html="props.section.title" />
            <div v-if="props.section.description" class="text-xl font-light mt-3 text-justify-center" v-html="props.section.description" />
        </div>
        <div v-if="status !== 'pending'" class="grid lg:grid-cols-4 gap-8">
            <template v-for="item in partners as Partner[]">
                <NuxtLink
                    v-if="item.active"
                    :key="item.id"
                    :href="item.link"
                    class="bg-white rounded-xl ring !ring-slate-400/10 hover:scale-105 transition-all p-8"
                    target="_blank"
                >
                    <NuxtImg
                        :alt="item.name"
                        :src="item.imageUrl"
                        :title="item.name"
                        class="h-full mx-auto object-contain bg-white"
                        height="100%"
                        loading="lazy"
                        preload
                        quality="80"
                        width="100%"
                    />
                </NuxtLink>
            </template>
        </div>
    </div>
</template>
