<script lang="ts" setup>
const { data: team, status } = await useApiFetch(`/api/get-team`, {
    lazy: true,
    transform: (team) => (team as ApiResponse).data as Team[],
});
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <section class="py-8">
        <div class="text-center max-w-4xl mx-auto pt-8">
            <div v-if="props.section.postTitle" class="text-lg font-medium" v-html="props.section.postTitle" />
            <div v-if="props.section.title" class="text-3xl lg:text-4xl font-bold text-primary" v-html="props.section.title" />
            <div v-if="props.section.description" class="text-xl font-light mt-3 text-justify-center" v-html="props.section.description" />
        </div>
        <div v-if="status !== 'pending'" class="max-w-5xl mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 py-8">
            <template v-for="member in team as Team[]" :key="member.id">
                <SectionTeamCard :member="member" />
            </template>
        </div>
    </section>
</template>
