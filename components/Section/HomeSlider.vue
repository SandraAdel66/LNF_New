<script setup>
import { register } from 'swiper/element/bundle';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

register();

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="min-h-[30rem]">
        <ClientOnly>
            <swiper-container :modules="[Autoplay, EffectFade, Navigation, Pagination]" :navigation="true"
                :pagination="true" :slides-per-view="1" :loop="true" :effect="'fade'"
                :autoplay="{ delay: 4000, disableOnInteraction: false }">
                <swiper-slide v-for="(slide, idx) in data" :key="idx"
                    class="w-full min-h-[30rem] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-sky-950/50 bg-blend-multiply"
                    :style="{
                        backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})` : 'none',
                        width: '100%',
                        minHeight: '30rem',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }">
                    <div class="max-w-4xl mx-auto sm:px-16 px-6">
                        <div class="text-center text-white pt-20 sm:pt-30 md:mt-0 px-6 z-10">
                            <div v-if="slide.text"
                                class="intro-y font-bold text-2xl sm:text-4xl leading-[2.5rem] sm:leading-[3rem]"
                                v-html="slide.text" />
                            <div v-if="slide.description" class="intro-y text-lg sm:text-xl mt-2"
                                v-html="slide.description" />
                            <div v-if="slide.buttonOneActive"
                                class="space-x-2 sm:space-x-4 intro-y mt-4 flex flex-wrap justify-center">
                                <NuxtLink target="_blank" :to="slide.buttonOne.target">
                                    <button
                                        :class="['btn btn-lg !px-6 sm:!px-8 btn-rounded btn-' + slide.buttonOne.style]">
                                        {{ slide.buttonOne.label }}
                                    </button>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                </swiper-slide>
            </swiper-container>
        </ClientOnly>
    </div>
</template>
