<script lang="ts" setup>
const { data: team, status } = await useApiFetch(`/api/get-team`, {
    lazy: true,
    transform: (team) => (team as ApiResponse).data as Team[],
});
</script>

<template>
    <div v-if="status !== 'pending'" class="max-w-5xl mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        <template v-for="member in team as Team[]" :key="member.id">
            <SectionTeamCard :member="member" />
        </template>
    </div>
</template>
