<script lang="ts" setup>
// Import necessary components
import type { PageSection } from '~/types'; // Adjust path as needed

const props = defineProps<{
    section: PageSection;
    index: number; // To determine odd/even for background alternation
}>();
</script>

<template>
    <!-- Alternating background based on index (0-based) -->
    <div 
        :class="[
            index % 2 === 0 
                ? 'bg-white text-[#162E51]' 
                : 'bg-[#1A4480] text-white',
            'py-16 px-4 md:px-12'
        ]"
    >
        <div class="container mx-auto">
            <div class="grid lg:grid-cols-12 items-center justify-between gap-8">
                <!-- Even index: text-left, image-right, white background -->
                <template v-if="index % 2 === 0">
                    <!-- Text Content (Left Side) -->
                    <div class="lg:col-span-7">
                        <div 
                            v-if="props.section.subTitle" 
                            class="text-lg font-medium mb-2" 
                            v-html="props.section.subTitle" 
                        />
                        
                        <div 
                            v-if="props.section.title" 
                            class="font-merriweather text-3xl md:text-4xl font-bold mb-4" 
                            v-html="props.section.title" 
                        />
                        
                        <div 
                            v-if="props.section.description" 
                            class="text-lg font-light mb-6 text-justify" 
                            v-html="props.section.description" 
                        />
                        
                        <!-- Buttons -->
                        <div 
                            v-if="props.section.buttonOneActive || props.section.buttonTwoActive" 
                            class="flex flex-col md:flex-row justify-start gap-4"
                        >
                            <div v-if="props.section.buttonOneActive">
                                <NuxtLink 
                                    :target="props.section.buttonOne?.target" 
                                    :to="props.section.buttonOne?.url"
                                >
                                    <button 
                                        :class="[
                                            'btn px-6 btn-rounded md:w-fit w-full',
                                            'bg-[#1A4480] text-white hover:bg-[#153a6d]',
                                            'border-0 transition-all duration-300'
                                        ]"
                                    >
                                        <Icon 
                                            v-if="props.section.buttonOne?.icon" 
                                            :name="props.section.buttonOne?.icon" 
                                            class="size-5 mr-2" 
                                        />
                                        {{ props.section.buttonOne?.label }}
                                    </button>
                                </NuxtLink>
                            </div>
                            
                            <div v-if="props.section.buttonTwoActive">
                                <NuxtLink 
                                    :target="props.section.buttonTwo?.target" 
                                    :to="props.section.buttonTwo?.url"
                                >
                                    <button 
                                        :class="[
                                            'btn px-6 btn-rounded md:w-fit w-full',
                                            'bg-[#1A4480] text-white hover:bg-[#153a6d]',
                                            'border-0 transition-all duration-300'
                                        ]"
                                    >
                                        <Icon 
                                            v-if="props.section.buttonTwo?.icon" 
                                            :name="props.section.buttonTwo?.icon" 
                                            class="size-5 mr-2" 
                                        />
                                        {{ props.section.buttonTwo?.label }}
                                    </button>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Image (Right Side) -->
                    <div class="lg:col-span-5 order-last">
                        <NuxtImg
                            v-if="props.section.imageUrl"
                            :alt="props.section.title || 'Section image'"
                            :src="props.section.imageUrl"
                            :title="props.section.title || ''"
                            class="object-contain w-full h-full hover:scale-105 transition-all rounded-xl duration-500 ease-in-out"
                        />
                    </div>
                </template>

                <!-- Odd index: image-left, text-right, blue background -->
                <template v-else>
                    <!-- Image (Left Side) -->
                    <div class="lg:col-span-5">
                        <NuxtImg
                            v-if="props.section.imageUrl"
                            :alt="props.section.title || 'Section image'"
                            :src="props.section.imageUrl"
                            :title="props.section.title || ''"
                            class="object-contain w-full h-full hover:scale-105 transition-all rounded-xl duration-500 ease-in-out"
                        />
                    </div>
                    
                    <!-- Text Content (Right Side) -->
                    <div class="lg:col-span-7">
                        <div 
                            v-if="props.section.subTitle" 
                            class="text-lg font-medium mb-2" 
                            v-html="props.section.subTitle" 
                        />
                        
                        <div 
                            v-if="props.section.title" 
                            class="font-merriweather text-3xl md:text-4xl font-bold mb-4" 
                            v-html="props.section.title" 
                        />
                        
                        <div 
                            v-if="props.section.description" 
                            class="text-lg font-light mb-6 text-justify" 
                            v-html="props.section.description" 
                        />
                        
                        <!-- Buttons with white background and blue text -->
                        <div 
                            v-if="props.section.buttonOneActive || props.section.buttonTwoActive" 
                            class="flex flex-col md:flex-row justify-start gap-4"
                        >
                            <div v-if="props.section.buttonOneActive">
                                <NuxtLink 
                                    :target="props.section.buttonOne?.target" 
                                    :to="props.section.buttonOne?.url"
                                >
                                    <button 
                                        :class="[
                                            'btn px-6 btn-rounded md:w-fit w-full',
                                            'bg-white text-[#162E51] hover:bg-gray-100',
                                            'border-0 transition-all duration-300'
                                        ]"
                                    >
                                        <Icon 
                                            v-if="props.section.buttonOne?.icon" 
                                            :name="props.section.buttonOne?.icon" 
                                            class="size-5 mr-2" 
                                        />
                                        {{ props.section.buttonOne?.label }}
                                    </button>
                                </NuxtLink>
                            </div>
                            
                            <div v-if="props.section.buttonTwoActive">
                                <NuxtLink 
                                    :target="props.section.buttonTwo?.target" 
                                    :to="props.section.buttonTwo?.url"
                                >
                                    <button 
                                        :class="[
                                            'btn px-6 btn-rounded md:w-fit w-full',
                                            'bg-white text-[#162E51] hover:bg-gray-100',
                                            'border-0 transition-all duration-300'
                                        ]"
                                    >
                                        <Icon 
                                            v-if="props.section.buttonTwo?.icon" 
                                            :name="props.section.buttonTwo?.icon" 
                                            class="size-5 mr-2" 
                                        />
                                        {{ props.section.buttonTwo?.label }}
                                    </button>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* If you need to add component-specific styles */
</style>