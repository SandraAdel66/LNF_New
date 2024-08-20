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
        <div class="max-w-2xl mx-auto flex items-center gap-5 place-content-center">
            <template v-for="tab in tabs" :key="tab.id">
                <button :class="[activeTab === tab.id ? '' : 'opacity-50', 'btn  px-6 gap-3 btn-primary']" type="button" @click="viewTab(tab.id)">
                    <Icon class="size-5" name="solar:calendar-line-duotone" />
                    <span>{{ tab.name }}</span>
                </button>
            </template>
        </div>
        <div>
            <div v-if="activeTab === 'conferences'" class="flex flex-col gap-5 mt-8">
                <template v-if="(events as Exhibition[]).some((e) => e.type === 'conferences' && !e.eventOver)">
                    <div class="flex items-center gap-3">
                        <Icon class="size-6 opacity-75" name="solar:calendar-line-duotone" />
                        <div class="font-semibold text-base">Upcoming Conferences</div>
                    </div>
                    <template v-for="(event, index) in (events as Exhibition[]).filter((e) => e.type === 'conferences' && !e.eventOver)" :key="index">
                        <SectionEventsCard :event="event" />
                    </template>
                    <div class="border-b" />
                </template>

                <template v-if="(events as Exhibition[]).some((e) => e.type === 'conferences' && e.eventOver)">
                    <div class="flex items-center gap-3">
                        <Icon class="size-6 opacity-75" name="solar:calendar-line-duotone" />
                        <div class="font-semibold text-base">Previous Conferences</div>
                    </div>
                    <template v-for="(event, index) in (events as Exhibition[]).filter((e) => e.type === 'conferences' && e.eventOver)" :key="index">
                        <SectionEventsCard :event="event" />
                    </template>
                </template>
            </div>
            <div v-if="activeTab === 'exhibitions'" class="flex flex-col gap-5 mt-8">
                <template v-if="(events as Exhibition[]).some((e) => e.type === 'exhibitions' && !e.eventOver)">
                    <div class="flex items-center gap-3">
                        <Icon class="size-5 opacity-75" name="solar:calendar-line-duotone" />
                        <div class="font-semibold text-base">Upcoming Exhibitions</div>
                    </div>
                    <template v-for="(event, index) in (events as Exhibition[]).filter((e) => e.type === 'exhibitions' && !e.eventOver)" :key="index">
                        <SectionEventsCard :event="event" />
                    </template>
                </template>
                <template v-if="(events as Exhibition[]).some((e) => e.type === 'exhibitions' && e.eventOver)">
                    <div class="flex items-center gap-3">
                        <Icon class="size-5 opacity-75" name="solar:calendar-line-duotone" />
                        <div class="font-semibold text-base">Previous Exhibitions</div>
                    </div>
                    <template v-for="(event, index) in (events as Exhibition[]).filter((e) => e.type === 'exhibitions' && e.eventOver)" :key="index">
                        <SectionEventsCard :event="event" />
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>
