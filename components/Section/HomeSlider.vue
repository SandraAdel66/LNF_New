<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});
import { register } from 'swiper/element/bundle';
register();
</script>

<template>
  <div class="min-h-[30rem]">
    <ClientOnly>
    <swiper-container>
      <swiper-slide
        v-for="(slide, idx) in data"
        :key="idx"
        class="w-full min-h-[30rem] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-sky-950/50 bg-blend-multiply"
        :style="{
          backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})` : 'none',
          width: '100%',
          minHeight: '30rem',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
        :modules="[Autoplay, EffectFade, Navigation, Pagination]"
        :navigation="true"
        :pagination="true"
        :slides-per-view="1"
        :loop="true"
        :effect="'fade'"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
      >
        <div class="max-w-4xl mx-auto sm:px-16 px-8">
          <div class="text-center text-white pt-36 md:mt-0 px-12 z-10">
                <div v-if="slide.text" class="intro-y font-bold text-4xl leading-[3rem]" v-html="slide.text" />
                <div v-if="slide.description" class="intro-y text-xl " v-html="slide.description" />
                <div v-if="slide.buttonOneActive" class="space-x-4 intro-y">
                  <NuxtLink :target="slide.buttonOne.target" :to="slide.buttonOne.url">
                      <button :class="['btn btn-lg !px-8 btn-rounded btn-' + slide.buttonOne.style + ' mt-4']">{{ slide.buttonOne.label }}</button>
                  </NuxtLink>
                </div>
            </div>

        </div>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
  </div>

</template>
