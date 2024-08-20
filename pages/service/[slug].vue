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
            <div class="lg:col-span-4 bg-white rounded-2xl p-5">
                <ul class="list-disc list-outside pl-5">
                    <li v-for="(service, index) in resources.services" :key="index">
                        <NuxtLink
                            :href="'/service/' + service.slug"
                            :disabled="service.slug === slug"
                            type="button"
                            :class="[service.slug === slug ? 'opacity-100 text-primary' : 'opacity-50', 'py-1 font-semibold hover:text-primary']"
                        >
                            <span>{{ service.name }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="lg:col-span-8 prose prose-slate prose-sm" v-html="(service as Service).description" />
        </div>
    </div>
</template>

<style scoped></style>
