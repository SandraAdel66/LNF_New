<script lang="ts" setup>
defineProps<{
    event: Exhibition;
}>();
const screenWidth = ref();

function splitDate(dateString: string) {
    return dateString.split(','); // Split the string by comma (',')
}

onMounted(() => {
    screenWidth.value = window.innerWidth;
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
watch(screenWidth, (newWidth) => {
    handleResize();
});

function handleResize() {
    screenWidth.value = window.innerWidth;
}
</script>

<template>
    <div class="text-sm intro-x mt-4 grid grid-cols-12 items-start lg:gap-4 overflow-hidden bg-white rounded-lg min-h-64">
        <div class="relative xl:col-span-4 col-span-12 group bg-white border h-full overflow-hidden">
            <div class="z-30 absolute top-0 left-0 py-2 px-4 text-white bg-primary text-center">
                <div
                    v-for="(datePart, index) in splitDate(event.startDateFront)"
                    :key="datePart"
                    :class="[index === 0 ? 'font-bold' : '', index === 1 ? 'font-light' : '', index === 2 ? 'font-semibold' : '']"
                >
                    {{ datePart }}
                </div>
            </div>
            <NuxtImg :alt="event.title" :src="event.imageUrl" class="object-cover w-full h-full inset-0 group-hover:scale-125 ease-in-out duration-[4s]" />
        </div>
        <div class="xl:col-span-8 col-span-12 h-full p-4">
            <h1 v-if="event.title" class="text-base font-semibold capitalize pb-2 border-b truncate">
                {{ event.title }}
            </h1>
            <div class="mt-2 border-b pb-3">
                <div class="md:flex items-center justify-between gap-6 py-1 md:space-y-0 space-y-2">
                    <div v-if="event.venue" class="flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:buildings-2-line-duotone" />
                        <span class="font-semibold">
                            {{ event.venue }}
                        </span>
                    </div>
                    <div v-if="event.country && event.country?.name" class="flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:map-point-wave-line-duotone" />
                        <div>
                            <span class="font-semibold">{{ event.country?.name }}</span>
                            <span v-if="event.city" class="font-light">, {{ event.city }}</span>
                        </div>
                    </div>
                </div>
                <div class="md:flex items-center sm:mt-0 mt-3 md:gap-6 md:space-y-0 space-y-2">
                    <div v-if="event.companies" class="flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:buildings-linear" />
                        <div>
                            <span>{{ event.companies }}</span
                            ><span class="ml-2 opacity-75 font-light text-sm">Companies</span>
                        </div>
                    </div>
                    <div v-if="event.delegates" class="flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:users-group-two-rounded-outline" />
                        <div>
                            <span>{{ event.delegates }}</span
                            ><span class="ml-2 opacity-75 font-light text-sm">Delegates</span>
                        </div>
                    </div>
                    <div v-if="event.sessions" class="flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:chat-square-arrow-linear" />
                        <div>
                            <span>{{ event.sessions }}</span
                            ><span class="ml-2 opacity-75 font-light text-sm">Sessions</span>
                        </div>
                    </div>
                    <div v-if="event.countries" class="flex items-center gap-2">
                        <Icon class="size-5 opacity-75 font-light text-sm" name="solar:earth-outline" />
                        <div>
                            <span>{{ event.countries }}</span
                            ><span class="ml-2 opacity-75 font-light text-sm">Countries</span>
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="event.shortDes" class="mt-2 font-normal text-justify line-clamp-5">{{ event.shortDes }}</p>
            <div v-if="event.gallery && event.gallery?.length > 0" class="flex items-center gap-4 p-1 border mt-2 rounded-md">
                <template v-for="(image, index) in event.gallery" :key="image.id">
                    <div
                        v-if="screenWidth >= 1400 ? index < 12 : screenWidth >= 768 ? index < 8 : index < 4"
                        class="group bg-white object-cover w-full h-12 rounded-md border overflow-hidden"
                    >
                        <NuxtImg :alt="event.title" :src="image.fullUrl" class="object-cover rounded-md w-full h-12 inset-0 group-hover:scale-125 ease-in-out duration-300" />
                    </div>
                </template>
            </div>
            <div class="mt-5">
                <a v-if="!event.eventOver" :href="event.urlPath" target="_blank">
                    <button class="btn btn-primary w-full">
                        {{ event.urlText }}
                    </button>
                </a>
                <template v-else>
                    <NuxtLink v-if="event.gallery?.length > 0" :href="'/event/' + event.slug">
                        <button class="btn btn-primary w-full">View Gallery</button>
                    </NuxtLink>
                </template>
            </div>
        </div>
    </div>
</template>
