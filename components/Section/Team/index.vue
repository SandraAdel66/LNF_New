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
    <section class="py-8 bg-white">
        <div class="text-center max-w-4xl mx-auto pt-8">
            <div v-if="props.section.postTitle" class="text-lg font-medium" v-html="props.section.postTitle" />
            <div v-if="props.section.title" class="text-3xl lg:text-4xl font-bold text-[#0f2c49] font-merriweather" v-html="props.section.title" />
            <div v-if="props.section.description" class="text-xl font-light mt-3 text-justify-center" v-html="props.section.description" />
        </div>
        <div v-if="status !== 'pending'" class="w-full mx-auto px-6 sm:px-6">
         <div class="space-y-6 py-8">
                <!-- First row -->
                <div class="grid grid-cols-4 gap-4"> <!-- Reduced gap -->
                    <template v-for="member in (team as Team[]).slice(0, 4)" :key="member.id">
                        <div class="scale-60 transform-gpu"> 
                            <SectionTeamCard :member="member" />
                        </div>
                    </template>
                </div>
                <!-- Second row-->
                <div class="flex justify-center">
                        <div class="grid grid-cols-3 gap-4" style="width: calc(75% + 1rem)"> 
                            <template v-for="member in (team as Team[]).slice(4, 7)" :key="member.id">
                                <div class="w-full scale-60 transform-gpu">
                                    <SectionTeamCard :member="member" />
                                </div>
</template>
            </div>
        </div>
    </div>
</div>
    </section>
</template>