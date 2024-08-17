<script lang="ts" setup>
const { data: faq, status } = await useApiFetch<ApiResponse>(`/api/faq-public`, {
    lazy: true,
    transform: (faq) => faq.data,
});
</script>

<template>
    <div v-if="status !== 'pending'">
        <div v-for="item in faq" :key="item.id" class="flex flex-col gap-5">
            <SectionFaqCard :data="item" />
        </div>
    </div>
</template>
