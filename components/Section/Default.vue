<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <div class="container mx-auto py-16 px-12">
        <div class="grid lg:grid-cols-12 items-center justify-between gap-5">
            <template v-if="props.section.type === 'about-right-image' || props.section.type === 'about-left-image'">
                <div :class="[props.section.type === 'about-right-image' && 'order-last', 'lg:col-span-5']">
                    <NuxtImg
                        v-if="props.section.image"
                        :alt="props.section.title"
                        :src="props.section.imageUrl"
                        :title="props.section.title"
                        class="object-contain w-full h-full hover:scale-105 transition-all rounded-xl duration-500 ease-in-out"
                    />
                </div>
                <div class="h-full lg:col-span-7">
                    <div v-if="props.section.subTitle" class="text-lg font-medium" v-html="props.section.subTitle" />
                    <div v-if="props.section.title" class="text-2xl font-bold text-primary" v-html="props.section.title" />
                    <div v-if="props.section.description" class="text-lg font-light mt-3 text-justify" v-html="props.section.description" />
                    <div class="lg:col-span-12 mt-5">
                    <div v-if="props.section.buttonOneActive || props.section.buttonTwoActive" class="flex flex-col md:flex-row justify-start gap-5">
                    <div v-if="props.section.buttonOneActive">
                        <template v-if="props.section.buttonOne?.target === '_self'">
                            <NuxtLink target="_self" :to="props.section.buttonOne.url">
                                <button :class="'btn-' + props.section.buttonOne?.style" class="btn px-6 btn-rounded md:w-fit w-full">
                                    <Icon v-if="props.section.buttonOne?.icon" :name="props.section.buttonOne?.icon" class="size-5 mr-2" />
                                    {{ props.section.buttonOne?.label }}
                                </button>
                            </NuxtLink>
                        </template>
                        <template v-else>
                            <NuxtLink target="_black" :to="props.section.buttonOne.url">
                                <button :class="'btn-' + props.section.buttonOne?.style" class="btn px-6 btn-rounded md:w-fit w-full">
                                    <Icon v-if="props.section.buttonOne?.icon" :name="props.section.buttonOne?.icon" class="size-5 mr-2" />
                                    {{ props.section.buttonOne?.label }}
                                </button>
                            </NuxtLink>
                        </template>
                    </div>
                    <div v-if="props.section.buttonTwoActive">
                        <template v-if="props.section.buttonTwo?.target === '_self'">
                            <NuxtLink target="_self" :to="props.section.buttonTwo.url">
                                <button :class="'btn-' + props.section.buttonTwo?.style" class="btn px-6 btn-rounded md:w-fit w-full">
                                    <Icon v-if="props.section.buttonTwo?.icon" :name="props.section.buttonTwo?.icon" class="size-5 mr-2" />
                                    {{ props.section.buttonTwo?.label }}
                                </button>
                            </NuxtLink>
                        </template>
                        <template v-else>
                            <NuxtLink target="_black" :to="props.section.buttonTwo.url">
                                <button :class="'btn-' + props.section.buttonTwo?.style" class="btn px-6 btn-rounded md:w-fit w-full">
                                    <Icon v-if="props.section.buttonTwo?.icon" :name="props.section.buttonTwo?.icon" class="size-5 mr-2" />
                                    {{ props.section.buttonTwo?.label }}
                                </button>
                            </NuxtLink>
                        </template>
                    </div>
                    </div>
                    </div>
                    </div>
                    </template>
                    <div v-else-if="props.section.type === 'about-no-image'" class="lg:col-span-12">
                        <div v-if="props.section.title" class="text-2xl font-bold text-primary text-center" v-html="props.section.title" />
                        <div v-if="props.section.description" class="text-lg font-light mt-3 text-justify-center" v-html="props.section.description" />
                    </div>
            
        </div>
        
    </div>
</template>
