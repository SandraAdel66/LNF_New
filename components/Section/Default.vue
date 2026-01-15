<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <div class="container mx-auto py-16 px-12">
        <div class="grid lg:grid-cols-12 items-stretch gap-10"> <!-- Changed from items-center to items-stretch -->
            <template v-if="props.section.type === 'about-right-image' || props.section.type === 'about-left-image'">
                <!-- Image column -->
                <div :class="[
                    props.section.type === 'about-right-image' && 'order-last',
                    'lg:col-span-5 flex items-center'
                ]">
                    <div class="w-full">
                        <NuxtImg
                            v-if="props.section.image"
                            :alt="props.section.title"
                            :src="props.section.imageUrl"
                            :title="props.section.title"
                            class="object-contain w-full max-h-[500px] hover:scale-105 transition-all rounded-xl duration-500 ease-in-out"
                        />
                    </div>
                </div>
                
                <!-- Content column -->
                <div class="lg:col-span-7 flex flex-col justify-center"> <!-- Added flex flex-col justify-center -->
                    <!-- Title -->
                    <div v-if="props.section.title" class="text-3xl font-bold text-primary font-merriweather mb-3" v-html="props.section.title" />
                    
                    <!-- Subtitle -->
                    <div v-if="props.section.subTitle" class="text-lg font-medium mb-2" v-html="props.section.subTitle" />
                    
                    <!-- Description -->
                    <div v-if="props.section.description" class="text-lg font-light mt-3 text-justify" v-html="props.section.description" />
                    
                    <!-- Buttons -->
                    <div class="mt-5">
                        <div v-if="props.section.buttonOneActive || props.section.buttonTwoActive" class="flex flex-col md:flex-row justify-between gap-5">
                            <div v-if="props.section.buttonOneActive">
                                <NuxtLink :target="props.section.buttonOne.target" :to="props.section.buttonOne.url">
                                    <button :class="'btn-' + props.section.buttonOne?.style" class="btn px-6 btn-rounded md:w-fit w-full">
                                        <Icon v-if="props.section.buttonOne?.icon" :name="props.section.buttonOne?.icon" class="size-5 mr-2" />
                                        {{ props.section.buttonOne?.label }}
                                    </button>
                                </NuxtLink>
                            </div>
                            <div v-if="props.section.buttonTwoActive">
                                <NuxtLink :target="props.section.buttonTwo.target" :to="props.section.buttonTwo.url">
                                    <button :class="'btn-' + props.section.buttonTwo?.style" class="btn px-6 btn-rounded md:w-fit w-full">
                                        <Icon v-if="props.section.buttonTwo?.icon" :name="props.section.buttonTwo?.icon" class="size-5 mr-2" />
                                        {{ props.section.buttonTwo?.label }}
                                    </button>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div v-else-if="props.section.type === 'about-no-image'" class="lg:col-span-12">
                <div v-if="props.section.title" class="text-3xl font-bold text-primary text-center font-merriweather" v-html="props.section.title" />
                <div v-if="props.section.description" class="text-lg font-light mt-3 text-justify-center" v-html="props.section.description" />
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>