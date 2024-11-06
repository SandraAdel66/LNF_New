<script setup lang="ts">
const route = useRoute();
const slug = ref(route.params.slug);

const { data: service, status } = await useApiFetch(`/api/get-service/${slug.value}`, {
    lazy: true,
    transform: (service) => (service as ApiResponse).data as Service,
});
const resources = useResourceStore();
useSeoMeta({
    title: (service.value as Page)?.name,
    description: (service.value as Page)?.des,
});
</script>

<template>
    <div v-if="status !== 'pending'">
        <SectionBenefitsHeader :benefit="service" />
        <div class="my-8 container px-6 grid lg:grid-cols-12 gap-5">
            <div class="lg:col-span-4 p-5 bg-slate-50 rounded-lg shadow-sm">
                <ul class="list-disc list-outside pl-5">
                    <template v-for="(service, index) in resources.services" :key="index">
                        <li v-if="service.name">
                            <NuxtLink :href="'/service/' + service.slug" :disabled="service.slug === slug">
                                <div :class="[service.slug === slug ? 'opacity-100 text-primary' : 'opacity-65', '!py-2 font-medium hover:text-primary']">{{ service.name }}</div>
                            </NuxtLink>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="lg:col-span-8 prose text-black prose-sm" v-html="(service as Service).description" />
        </div>
    </div>
</template>
