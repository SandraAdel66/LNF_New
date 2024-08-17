<script setup>
const { data, status } = await useApiFetch(`/api/slider-public`, {
    lazy: true,
    transform: (data) => data.data,
});
</script>

<template>
    <div v-if="status !== 'pending'" class="relative 2xl:min-h-[45rem] min-h-[35rem]">
        <div class="absolute inset-0 z-1 object-cover">
            <Swiper
                :autoplay="{ delay: 10000, disableOnInteraction: true }"
                :effect="'fade'"
                :loop="true"
                :modules="[SwiperAutoplay, SwiperEffectFade, SwiperNavigation, SwiperPagination]"
                :navigation="true"
                :pagination="true"
                :slides-per-view="1"
                class="w-full h-full object-cover object-center"
            >
                <SwiperSlide v-for="(slide, index) in data" :key="index">
                    <!--                    <div class="max-w-7xl mx-auto xl:px-5 px-12 relative min-h-[40rem] items-center pb-24 lg:flex">-->
                    <!--                        <div class="text-center lg:text-left text-white pt-36 md:mt-0 px-12">-->
                    <!--                            <div v-if="slide.postTitle" class="intro-y text-xl uppercase" v-html="slide.postTitle" />-->
                    <!--                            <div-->
                    <!--                                v-if="slide.title"-->
                    <!--                                class="intro-y mt-4 md:text-5xl text-4xl font-extrabold uppercase tracking-tight sm:mt-5 sm:leading-none lg:mt-2 lg:text-6xl xl:text-7xl"-->
                    <!--                                v-html="slide.title"-->
                    <!--                            />-->
                    <!--                            <div v-if="slide.subTitle" class="intro-y text-2xl font-semibold" v-html="slide.subTitle" />-->
                    <!--                            <div v-if="slide.description" class="intro-y text-xl" v-html="slide.description" />-->
                    <!--                            <template v-if="!userStore.token">-->
                    <!--                                <div v-if="slide.buttonOneActive" class="space-x-4 intro-y">-->
                    <!--                                    <NuxtLink :target="slide.buttonOne.target" :to="slide.buttonOne.url">-->
                    <!--                                        <button :class="['btn btn-lg !px-8 btn-rounded btn-' + slide.buttonOne.style + ' mt-4']">-->
                    <!--                                            {{ slide.buttonOne.label }}-->
                    <!--                                        </button>-->
                    <!--                                    </NuxtLink>-->
                    <!--                                </div>-->
                    <!--                            </template>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <!--                    <div  class="absolute inset-0 z-10 bg-black/35" />-->
                    <NuxtLink :href="slide.bgUrl ? slide.bgUrl : null" :target="slide.bgUrl ? (slide.linkType ? '_self' : '_blank') : null">
                        <video v-if="slide?.image?.mimeType === 'video/mp4'" autoplay class="object-cover w-full h-full object-center" loop muted>
                            <source :src="slide.imageUrl" type="video/mp4" />
                        </video>
                        <NuxtImg
                            v-else
                            :alt="useSettingValue('app_name')"
                            :src="slide.imageUrl"
                            :title="useSettingValue('app_name')"
                            class="object-cover w-full h-full object-center"
                            height="100%"
                            loading="lazy"
                            preload
                            quality="80"
                            width="100%"
                        />
                    </NuxtLink>
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="hero-divider z-10">
            <svg data-name="Layer 1" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
                <path
                    class="divider-fill"
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                />
            </svg>
        </div>
    </div>
</template>
