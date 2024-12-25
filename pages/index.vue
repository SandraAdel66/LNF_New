<script setup lang="ts">
const slug = ref('home');

const { data: page, status } = await useApiFetch(`/api/get-page/${slug.value}`, {
    lazy: true,
    transform: (page) => (page as ApiResponse).data as Page,
});

const { data: sliders, status: slidersStatus } = await useApiFetch(`/api/get-slider`, {
    lazy: true,
    transform: (sliders) => (sliders as ApiResponse).data as Slider[],
});

const { data: networkLogos, status: logosStatus } = await useApiFetch(`/api/get-logo-company/public`, {
    lazy: true,
    transform: (networkLogos) => (networkLogos as ApiResponse).data as NetworkLogos[],
});

useSeoMeta({
    title: (page.value as Page)?.name,
    description: (page.value as Page)?.des,
});

const texts = (sliders.value as Slider[]) ?? [];

const currentText = ref(texts[0]?.text);
const currentId = ref(texts[0]?.id);
const currentImageUrl = ref(texts[0]?.imageUrl);
const currentDescription = ref(texts[0]?.description);
const currentButtonOneActive = ref(texts[0]?.buttonOneActive);
const currentButtonTwoActive = ref(texts[0]?.buttonTwoActive);
const currentButtonOneData = ref(texts[0]?.buttonOne);
const currentButtonTwoData = ref(texts[0]?.buttonTwo);
const addIntroClass = ref(false);
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const pauseDuration = 4000;
const typeText = () => {
    if (charIndex < texts[textIndex].text.length) {
        currentText.value = texts[textIndex].text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(() => {
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
            currentId.value = texts[textIndex].id;
            currentImageUrl.value = texts[textIndex].imageUrl;
            currentDescription.value = texts[textIndex].description;
            currentButtonOneActive.value = texts[textIndex].buttonOneActive;
            currentButtonTwoActive.value = texts[textIndex].buttonTwoActive;
            currentButtonOneData.value = texts[textIndex].buttonOne;
            currentButtonTwoData.value = texts[textIndex].buttonTwo;
            typeText();
        }, pauseDuration);
    }
};
watch(currentId, () => {
    addIntroClass.value = true;
    setTimeout(() => {
        addIntroClass.value = false;
    }, 1000); // Adjust duration as needed
});
onMounted(() => {
    typeText();
});

const introImageUrl = ref('/images/bg.svg');
</script>

<template>
    <div v-if="status !== 'pending'">
        <section class="lg:min-h-[30rem] bg-cover bg-bottom bg-blue-100" :style="{ backgroundImage: `url(${introImageUrl})` }">
            <div v-if="slidersStatus !== 'pending'" class="container px-6 grid lg:grid-cols-12 gap-5 items-center pt-12">
                <div class="flex items-center lg:col-span-7 justify-start">
                    <div class="flex flex-col gap-3">
                        <div class="-intro-y">
                            <div class="font-normal 2xl:text-lg text-base">Logistics Network Federation</div>
                            <div :class="'font-extrabold 2xl:text-4xl text-3xl mt-2 leading-tight text-primary'">{{ currentText }}</div>
                        </div>
                        <p :class="['text-lg', { '-intro-x': addIntroClass }]">
                            {{ currentDescription }}
                        </p>
                        <div class="mt-5 flex items-center gap-5">
                            <NuxtLink v-if="currentButtonOneActive" class="intro-x" :href="currentButtonOneData?.target">
                                <button :class="'!btn-' + currentButtonOneData.style" class="btn w-full btn-primary btn-rounded gap-3 px-6">
                                    <Icon :name="currentButtonOneData.icon" class="size-6" />
                                    <span>{{ currentButtonOneData.label }}</span>
                                </button>
                            </NuxtLink>
                            <NuxtLink v-if="currentButtonTwoActive" class="intro-x" :href="currentButtonTwoData?.target">
                                <button :class="'!btn-' + currentButtonTwoData.style" class="btn w-full btn-secondary btn-rounded gap-3 px-6">
                                    <Icon :name="currentButtonTwoData.icon" class="size-6" />
                                    <span>{{ currentButtonTwoData.label }}</span>
                                </button>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="flex items-center place-content-center lg:col-span-5 justify-end">
                    <NuxtImg
                        v-if="currentImageUrl"
                        class="mx-auto size-96 border-4 border-white rounded-full object-center object-cover bg-white"
                        :class="addIntroClass && '-intro-x'"
                        :src="currentImageUrl"
                    />
                </div>
            </div>
        </section>
        <section v-if="page && page.pageSections && page?.pageSections.some((s: PageSection) => s.slug === 'the-core-idea')" class="relative bg-slate-50">
            <div class="container px-6">
                <div class="py-12">
                    <div class="text-center text-3xl font-bold" v-html="page.pageSections.find((s: PageSection) => s.slug === 'the-core-idea').title" />
                    <div
                        class="max-w-5xl mx-auto text-base mt-3 text-justify"
                        style="text-align-last: center"
                        v-html="page.pageSections.find((s: PageSection) => s.slug === 'the-core-idea').description"
                    />
                </div>
            </div>
        </section>
        <section class="relative bg-white py-12">
            <div class="container px-6">
                <div class="text-center">
                    <span class="text-3xl font-bold"><span class="font-medium text-primary mr-2">Board</span>Members</span>
                </div>
                <SectionTeam class="mt-8" />
            </div>
        </section>
        <section v-if="page && page.pageSections && page?.pageSections.some((s: PageSection) => s.slug === 'about-lnf')" class="relative bg-slate-50 py-12">
            <div class="container px-6">
                <div class="py-12">
                    <div class="text-center text-3xl font-bold" v-html="page.pageSections.find((s: PageSection) => s.slug === 'about-lnf').title" />
                    <div
                        class="max-w-5xl mx-auto text-base mt-3 text-justify"
                        style="text-align-last: center"
                        v-html="page.pageSections.find((s: PageSection) => s.slug === 'about-lnf').description"
                    />
                </div>
            </div>
        </section>
        <section class="relative white py-12">
            <div class="flex flex-col gap-5">
                <div class="text-center mt-8">
                    <span class="text-3xl font-bold"><span class="font-medium text-primary mr-2">Our</span>Networks</span>
                </div>
                <div class="w-full">
                    <ul class="container flex px-6 py-5 gap-8 p-5 place-content-center items-center">
                        <li v-for="network in networkLogos" :key="network.name" class="intro-x">
                            <div class="flex flex-col flex-wrap gap-2 text-center ease-in-out duration-300">
                                <NuxtImg :src="network.imageUrl" :title="network.name" :alt="network.name" class="w-full h-14 mx-auto rounded-lg" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
