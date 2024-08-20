<template>
    <Carousel v-if="status !== 'pending'" :autoplay="2000" :wrap-around="true" :transition="1000">
        <Slide v-for="article in (articles as ApiResponse).data as Article[]" :key="article.id">
            <NuxtLink :href="'/article/' + article.slug" class="relative h-36 w-full carousel__item">
                <NuxtImg class="inset-0 absolute object-cover object-center" :src="article.imageUrl" :alt="article.name" />
                <div class="absolute bg-black/50 inset-0" />
                <div class="text-xs inset-0 flex place-content-center items-center flex-col absolute z-50 text-white p-5">
                    <div class="font-bold">{{ article.name }}</div>
                </div>
            </NuxtLink>
        </Slide>
    </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
const { data: articles, status } = await useApiFetch(`/api/get-article-last`, {
    lazy: true,
});
</script>
