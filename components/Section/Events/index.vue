<script lang="ts" setup>
const tabs = ref([
    { id: 'conferences', name: 'Conferences' },
    { id: 'exhibitions', name: 'Exhibitions' },
]);
const activeTab = ref('conferences');

const viewTab = (tabId: string) => {
    activeTab.value = tabId;
};

const { data: events, status } = await useApiFetch(`/api/get-event`, {
    lazy: true,
    transform: (events) => (events as ApiResponse).data as Exhibition[],
});

console.log(events.value);
</script>

<template>
    <div v-if="status !== 'pending'">
        <div>
            <div class="grid lg:grid-cols-3 gap-5">
                <template v-for="(event, index) in events as Exhibition[]" :key="index">
                    <SectionEventsCard :event="event" />
                </template>
            </div>
        </div>
    </div>
</template>
