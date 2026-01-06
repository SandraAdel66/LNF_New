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

// Initialize with safe defaults
const texts = ref<Slider[]>([]);
const currentText = ref('');
const currentId = ref(0);
const currentImageUrl = ref('');
const currentDescription = ref('');
const currentButtonOneActive = ref(false);
const currentButtonTwoActive = ref(false);
const currentButtonOneData = ref({ icon: '', label: '', style: '', target: '' });
const currentButtonTwoData = ref({ icon: '', label: '', style: '', target: '' });
const addIntroClass = ref(false);

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const pauseDuration = 4000;

// Safe typeText function
const typeText = () => {
    if (!texts.value.length || !texts.value[textIndex]?.text) {
        return;
    }

    const currentSlider = texts.value[textIndex];
    const textToType = currentSlider.text || '';
    
    if (charIndex < textToType.length) {
        currentText.value = textToType.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(() => {
            textIndex = (textIndex + 1) % texts.value.length;
            charIndex = 0;
            
            const nextSlider = texts.value[textIndex];
            if (nextSlider) {
                currentId.value = nextSlider.id || 0;
                currentImageUrl.value = nextSlider.imageUrl || '';
                currentDescription.value = nextSlider.description || '';
                currentButtonOneActive.value = nextSlider.buttonOneActive || false;
                currentButtonTwoActive.value = nextSlider.buttonTwoActive || false;
                currentButtonOneData.value = nextSlider.buttonOne || { icon: '', label: '', style: '', target: '' };
                currentButtonTwoData.value = nextSlider.buttonTwo || { icon: '', label: '', style: '', target: '' };
            }
            
            typeText();
        }, pauseDuration);
    }
};

// Watch for sliders data changes
watch(sliders, (newSliders) => {
    if (newSliders && Array.isArray(newSliders) && newSliders.length > 0) {
        texts.value = newSliders as Slider[];
        
        const firstSlider = texts.value[0];
        if (firstSlider) {
            currentText.value = '';
            currentId.value = firstSlider.id || 0;
            currentImageUrl.value = firstSlider.imageUrl || '';
            currentDescription.value = firstSlider.description || '';
            currentButtonOneActive.value = firstSlider.buttonOneActive || false;
            currentButtonTwoActive.value = firstSlider.buttonTwoActive || false;
            currentButtonOneData.value = firstSlider.buttonOne || { icon: '', label: '', style: '', target: '' };
            currentButtonTwoData.value = firstSlider.buttonTwo || { icon: '', label: '', style: '', target: '' };
            
            textIndex = 0;
            charIndex = 0;
            typeText();
        }
    }
}, { immediate: true });

watch(currentId, () => {
    addIntroClass.value = true;
    setTimeout(() => {
        addIntroClass.value = false;
    }, 1000);
});

onMounted(async () => {
    await loadSliders();
});

const introImageUrl = ref('/images/bg.svg');
</script>

<template>
    <div v-if="page && status !== 'pending'">
        <LazySectionHomeSlider 
            :data="sliders" 
            :current-text="currentText"
            :current-id="currentId"
            :current-image-url="currentImageUrl"
            :current-description="currentDescription"
            :current-button-one-active="currentButtonOneActive"
            :current-button-two-active="currentButtonTwoActive"
            :current-button-one-data="currentButtonOneData"
            :current-button-two-data="currentButtonTwoData"
            :add-intro-class="addIntroClass"
        />

        <template v-for="section in (page as Page)?.pageSections as PageSection[]" :key="section.id">
            <Section :id="section.slug" class="even:bg-slate-50" :section="section" />
        </template>
    </div>
    
    <div v-else-if="status === 'pending'" class="flex justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else class="flex justify-center items-center min-h-screen">
        <div class="text-center">
            <h2 class="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h2>
            <p class="text-gray-600">Please try refreshing the page.</p>
        </div>
    </div>
</template>

<style scoped></style>