<script lang="ts" setup>
defineProps<{
    page: Page;
}>();
const { data: events, status } = await useApiFetch(`/api/get-event`, {
    lazy: true,
    transform: (events) => (events as ApiResponse).data as Exhibition[],
});

console.log(events.value);
</script>

<template>
    <div v-if="status !== 'pending'">
        <div class="py-4 border-b container">
            <div class="text-3xl font-bold">{{ page.name }}</div>
            <div class="max-w-5xl mt-1.5" v-html="page.des" />
        </div>
        <div>
            <div class="grid lg:grid-cols-3 gap-5">
                <template v-for="(event, index) in events as Exhibition[]" :key="index">
                    <SectionEventsCard :event="event" />
                </template>
            </div>
        </div>
    </div>
</template>
