<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

const firstImage = ref(null);

onMounted(() => {
    if (props.data && props.data.length > 0) {
        firstImage.value = props.data[0];
    }
});
</script>

<template>
    <div class="image-container">
        <div v-if="firstImage" class="single-image">
            <!-- عرض الصورة الواحدة -->
            <div 
                class="image-background"
                :style="{
                    backgroundImage: firstImage.imageUrl ? `url(${firstImage.imageUrl})` : 'none',
                    backgroundColor: firstImage.text ? 'rgba(7, 42, 81, 0.5)' : 'transparent'
                }">
            </div>
            
            <!-- إذا في text نعرض المحتوى -->
            <div v-if="firstImage.text" class="image-content">
                <div class="max-w-4xl mx-auto">
                    <div class="text-center text-white">
                        <div v-if="firstImage.text"
                            class="image-title"
                            v-html="firstImage.text" />
                        
                        <div v-if="firstImage.description" 
                            class="image-description"
                            v-html="firstImage.description" />
                        
                        <div v-if="firstImage.buttonOneActive"
                            class="image-buttons">
                            <NuxtLink target="_blank" :to="firstImage.buttonOne.target">
                                <button
                                    :class="['btn btn-lg btn-rounded btn-' + firstImage.buttonOne.style]">
                                    {{ firstImage.buttonOne.label }}
                                </button>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- حالة عدم وجود صور -->
        <div v-else class="no-image">
            No images available

    </div>
    </div>
</template>

<style scoped>
/* الحاوية الرئيسية */
.image-container {
    width: 100%;
    position: relative;
    overflow: hidden;
}

/* الصورة الواحدة */
.single-image {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40vh;
    min-height: 0;
}

/* خلفية الصورة */
.image-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-blend-mode: multiply;
    z-index: 1;
}

/* محتوى النص */
.image-content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

/* العنوان */
.image-title {
    font-weight: bold;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* الوصف */
.image-description {
    margin-top: 0.5rem;
    line-height: 1.4;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* الأزرار */
.image-buttons {
    margin-top: 1rem;
}

.btn {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
}

.btn-lg {
    padding: 0.75rem 2rem;
    font-size: 1.125rem;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* حالة عدم وجود صور */
.no-image {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    color: #6b7280;
}

/* ============ RESPONSIVE BREAKPOINTS ============ */

/* Mobile Extra Small (0-359px) - شاشات صغيرة جداً */
@media (max-width: 359px) {
    .single-image {
        min-height: 280px !important;
        height: 280px !important;
    }
    
    .image-title {
        font-size: 1.25rem;
        line-height: 1.3;
    }
    
    .image-description {
        font-size: 0.875rem;
    }
    
    .btn {
        padding: 0.375rem 1rem;
        font-size: 0.875rem;
    }
    
    .btn-lg {
        padding: 0.5rem 1.25rem;
        font-size: 0.875rem;
    }
}

/* Mobile Small (360-479px) */
@media (min-width: 360px) and (max-width: 479px) {
    .single-image {
        min-height: 220px !important;
        height: 220px !important;
    }
    
    .image-title {
        font-size: 1.5rem;
        line-height: 1.3;
    }
    
    .image-description {
        font-size: 1rem;
    }
    
    .image-content {
        padding: 1rem;
    }
}

/* Mobile (480-639px) */
@media (min-width: 480px) and (max-width: 639px) {
    .single-image {
        min-height: 310px !important;
        height: 310px !important;
    }
    
    .image-title {
        font-size: 1.75rem;
    }
    
    .image-description {
        font-size: 1.125rem;
    }
}

/* Tablet Small (640-767px) */
@media (min-width: 640px) and (max-width: 767px) {
    .single-image {
        min-height: 380px !important;
        height: 380px !important;
    }
    
    .image-title {
        font-size: 2rem;
    }
    
    .image-description {
        font-size: 1.25rem;
    }
    
    .image-content {
        padding: 1.5rem;
    }
}

/* Tablet (768-1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
    .single-image {
        min-height: 420px !important;
        height: 420px !important;
    }
    
    .image-title {
        font-size: 2.25rem;
    }
    
    .image-description {
        font-size: 1.375rem;
    }
    
    .btn-lg {
        padding: 0.875rem 2.25rem;
        font-size: 1.25rem;
    }
}

/* Laptop Small (1024-1279px) */
@media (min-width: 1024px) and (max-width: 1279px) {
    .single-image {
        height: 40vh !important;
        min-height: 0 !important;
    }
    
    .image-title {
        font-size: 2.75rem;
    }
    
    .image-description {
        font-size: 1.5rem;
    }
    
    .image-content {
        padding: 2rem;
    }
}

/* Laptop Large (1280-1439px) */
@media (min-width: 1280px) and (max-width: 1439px) {
    .single-image {
        height: 40vh !important;
        min-height: 0 !important;
    }
    
    .image-title {
        font-size: 3.25rem;
    }
    
    .image-description {
        font-size: 1.75rem;
    }
}

/* Desktop (1440-1735px) */
@media (min-width: 1440px) and (max-width: 1736px) {
    .single-image {
        height: 40vh !important;
        min-height: 0 !important;
    }
    
    .image-title {
        font-size: 3.75rem;
    }
    
    .image-description {
        font-size: 2rem;
    }
    
    .btn-lg {
        padding: 1rem 3rem;
        font-size: 1.5rem;
    }
}

/* Large Desktop (1736-1999px) */
@media (min-width: 1736px) and (max-width: 1999px) {
    .single-image {
        height: 40vh !important;
        min-height: 0 !important;
    }
    
    .image-title {
        font-size: 3.75rem;
    }
    
    .image-description {
        font-size: 2rem;
    }
    
    .btn-lg {
        padding: 1rem 3rem;
        font-size: 1.5rem;
    }
}

/* Desktop Large (1920px فما فوق) */
@media (min-width: 1920px) {
    .single-image {
        height: 40vh !important;
        min-height: 0 !important;
    }
    
    .image-title {
        font-size: 4.5rem;
    }
    
    .image-description {
        font-size: 2.25rem;
    }
}

/* 2560px */
@media (min-width: 2560px) {
    .single-image {
        min-height: 700px !important;
        height: 700px !important;
    }
    
    .image-title {
        font-size: 5rem;
    }
}

/* إصلاح للشاشات الطويلة (Landscape) */
@media (orientation: landscape) and (max-height: 500px) {
    .single-image {
        min-height: 100vh !important;
        height: 100vh !important;
    }
    
    .image-title {
        font-size: 1.5rem !important;
    }
    
    .image-description {
        font-size: 1rem !important;
    }
}

/* تأثيرات Hover */
@media (hover: hover) and (pointer: fine) {
    .btn:hover {
        transform: translateY(-3px);
    }
}

@media (hover: none) and (pointer: coarse) {
    .btn:active {
        transform: scale(0.98);
    }
}

/* تحسين للقراءة على الشاشات الصغيرة */
@media (max-width: 639px) {
    .image-content {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
}
</style>