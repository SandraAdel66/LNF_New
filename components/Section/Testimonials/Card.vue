<script lang="ts" setup>
const props = defineProps<{
    slide: Testimonial;
}>();
</script>

<template>
    <div class="flex flex-col place-content-center gap-5 p-5 pb-12 bg-slate-100">
        <NuxtImg
            :alt="props.slide.name"
            :src="props.slide.imageUrl"
            :title="props.slide.name"
            class="size-28 mx-auto object-cover rounded-full ring-4 ring-slate-500/10 bg-white"
            height="100%"
            loading="lazy"
            preload
            quality="80"
            width="100%"
        />
        <div class="text-center flex flex-col gap-2 place-content-center items-center">
            <div>
                <div>{{ props.slide.name }}</div>
                <div class="text-sm opacity-75">{{ props.slide.title }}</div>
            </div>
            <ApplicationCountry :country="props.slide.country" />
            <div class="relative h-full">
                <Icon class="absolute top-0 left-0 text-slate-300/60 !z-1 size-12" name="bx:bxs-quote-left" />
                <Icon class="absolute bottom-0 right-0 text-slate-300/60 !z-1 size-12" name="bx:bxs-quote-right" />
                <div class="font-light w-[85%] mx-auto line-clamp-3">{{ props.slide.shortDes }}</div>
            </div>
        </div>
    </div>
</template>
