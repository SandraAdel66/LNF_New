<script setup lang="ts">
const slug = ref('home');

const { data: page, status } = await useApiFetch(`/api/get-page/${slug.value}`, {
    lazy: true,
    transform: (page) => (page as ApiResponse).data as Page,
});

const {
    data: sliders,
    execute: loadSliders,
    status: slidersStatus,
} = await useApiFetch(`/api/get-slider`, {
    transform: (sliders) => (sliders as ApiResponse).data as Slider[],
});

const { data: networkLogos, status: logosStatus } = await useApiFetch(`/api/get-logo-company/public`, {
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
    if (charIndex < texts[textIndex]?.text.length) {
        currentText.value = texts[textIndex]?.text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(() => {
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
            currentId.value = texts[textIndex]?.id;
            currentImageUrl.value = texts[textIndex]?.imageUrl;
            currentDescription.value = texts[textIndex]?.description;
            currentButtonOneActive.value = texts[textIndex]?.buttonOneActive;
            currentButtonTwoActive.value = texts[textIndex]?.buttonTwoActive;
            currentButtonOneData.value = texts[textIndex]?.buttonOne;
            currentButtonTwoData.value = texts[textIndex]?.buttonTwo;
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
onMounted(async () => {
    await loadSliders();
});
onMounted(() => {
    typeText();
});

const introImageUrl = ref('/images/bg.svg');
</script>

<template>
    <div v-if="page && status !== 'pending'">
        <LazySectionHomeSlider :data="sliders" />
    
        <template v-for="section in (page as Page)?.pageSections as PageSection[]" :key="section.id">
            <Section :id="section.slug" class="even:bg-slate-50" :section="section" />
        </template>
    </div>
</template>

<style scoped></style>
