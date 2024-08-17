<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        benefit: Benefit;
        type: string;
    }>(),
    {
        type: 'grid', // grid, list
    },
);
const resources = useResourceStore();
</script>

<template>
    <template v-if="props.type === 'grid'">
        <NuxtLink :to="'/benefit/' + props.benefit.slug">
            <div class="relative hover:scale-105 border transition-all flex flex-col items-center p-6 bg-white h-full rounded-2xl shadow-sm group">
                <template v-if="props.benefit.icon === null && props.benefit.imageUrl">
                    <NuxtImg
                        :alt="props.benefit.name"
                        :src="props.benefit.imageUrl"
                        :title="props.benefit.name"
                        class="h-20 w-20 p-1 -mt-1 mb-2 group-hover:rotate-[360deg] ease-in-out duration-1000 object-contain"
                    />
                </template>
                <template v-else>
                    <SectionBenefitsIcon
                        :icon-name="props.benefit.icon"
                        class="h-20 w-20 p-1 -mt-1 mb-2 group-hover:rotate-[360deg] ease-in-out duration-1000"
                        color-one="text-primary"
                        color-two="text-slate-500/90"
                    />
                </template>

                <h4 class="2xl:text-xl text-lg text-primary font-bold leading-snug tracking-tight mb-1">
                    {{ props.benefit.name }}
                </h4>
                <p class="font-light line-clamp-2">{{ props.benefit.shortDes }}</p>
                <div class="mt-4 inline-block align-bottom">
                    <button class="btn btn-dark btn-rounded px-6">Read More</button>
                </div>
            </div>
        </NuxtLink>
    </template>
    <template v-if="props.type === 'list'">
        <NuxtLink :to="'/benefit/' + props.benefit.slug">
            <div class="relative hover:scale-[102%] overflow-hidden border transition-all p-6 bg-white h-full rounded-2xl shadow-sm group">
                <div class="relative grid lg:grid-cols-12 gap-5 items-start z-10">
                    <div class="lg:col-span-2 2xl:col-span-1">
                        <template v-if="props.benefit.icon === null && props.benefit.imageUrl">
                            <NuxtImg
                                :alt="props.benefit.name"
                                :src="props.benefit.imageUrl"
                                :title="props.benefit.name"
                                class="h-20 w-20 p-1 -mt-1 mb-2 group-hover:rotate-[360deg] ease-in-out duration-1000 object-contain"
                            />
                        </template>
                        <template v-else>
                            <SectionBenefitsIcon
                                :icon-name="props.benefit.icon"
                                class="h-20 w-20 p-1 -mt-1 mb-2 group-hover:rotate-[360deg] ease-in-out duration-1000"
                                color-one="text-primary"
                                color-two="text-slate-500/90"
                            />
                        </template>
                    </div>
                    <div class="lg:col-span-10 2xl:col-span-11">
                        <h4 class="2xl:text-xl text-lg text-primary font-bold leading-snug tracking-tight mb-1">
                            {{ props.benefit.name }}
                        </h4>
                        <p class="font-light line-clamp-2">{{ props.benefit.shortDes }}</p>
                    </div>
                </div>
            </div>
        </NuxtLink>
    </template>
</template>
