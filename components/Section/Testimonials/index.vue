<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();

const { data: testimonials, status } = await useApiFetch(`/api/testimonial-public`, {
    lazy: true,
    transform: (testimonials) => (testimonials as ApiResponse).data as Testimonial[],
});
</script>

<template>
    <div>
        <div class="text-center max-w-4xl mx-auto py-8">
            <div v-if="props.section.postTitle" class="text-lg font-medium" v-html="props.section.postTitle" />
            <div v-if="props.section.title" class="text-3xl lg:text-4xl font-bold text-primary" v-html="props.section.title" />
            <div v-if="props.section.des" class="text-xl font-light mt-3 text-justify-center" v-html="props.section.des" />
        </div>
        <div v-if="status !== 'pending'">
            <Swiper
                :autoplay="{ delay: 5000, disableOnInteraction: true }"
                :effect="'fade'"
                :loop="true"
                :loop-prevents-sliding="true"
                :modules="[SwiperAutoplay, SwiperEffectFade, SwiperNavigation, SwiperPagination]"
                :navigation="true"
                :pagination="true"
                :slides-per-view="1"
                :speed="500"
                class="max-w-4xl mx-auto"
            >
                <SwiperSlide v-for="(slide, index) in testimonials as Testimonial[]" :key="index">
                    <SectionTestimonialsCard :slide="slide" />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>
