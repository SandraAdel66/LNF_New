<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Import your existing store
const resources = useResourceStore()

// Match your Service interface
interface Service {
  name: string
  description: string
  slug: string
  // Add other properties you have
}

interface Props {
  // Optional: Override with specific services
  service1?: Service
  service2?: Service
  service3?: Service
  // Which service to open initially (1, 2, 3, or null)
  initialOpen?: number | null
  // Option to show more than 3 services
  limit?: number
  // Max width of the accordion
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialOpen: null,
  limit: 3,
  maxWidth: 'max-w-3xl' // Default max width
})

// Get services from resources store
const servicesList = computed(() => {
  if (props.service1 && props.service2 && props.service3) {
    // Use provided props
    return [props.service1, props.service2, props.service3].filter(Boolean)
  }
  
  // Use from resources store
  return resources.services?.slice(0, props.limit) || []
})

// State
const activeService = ref<number | null>(props.initialOpen)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Check if resources are loaded
onMounted(() => {
  if (!resources.services || resources.services.length === 0) {
    isLoading.value = true
    error.value = 'No services available'
    isLoading.value = false
  }
})

// Function to strip HTML tags and show plain text
const stripHtmlTags = (html: string): string => {
  if (!html) return ''
  
  // Remove HTML tags but keep line breaks
  return html
    .replace(/<[^>]*>/g, ' ') // Replace tags with space
    .replace(/\s+/g, ' ')     // Collapse multiple spaces
    .trim()
}

// Function to extract plain text (more sophisticated)
const extractPlainText = (html: string): string => {
  if (!html) return ''
  
  // Create a temporary element to parse HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  
  // Get text content
  const text = tempDiv.textContent || tempDiv.innerText || ''
  
  // Clean up
  return text
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim()
}

// Toggle service accordion
const toggleService = (serviceNumber: number) => {
  if (activeService.value === serviceNumber) {
    activeService.value = null
  } else {
    activeService.value = serviceNumber
  }
}

// Animation helpers
const onEnter = (el: HTMLElement) => {
  el.style.height = '0'
  el.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    el.style.height = el.scrollHeight + 'px'
  })
}

const onAfterEnter = (el: HTMLElement) => {
  el.style.height = 'auto'
}

const onLeave = (el: HTMLElement) => {
  el.style.height = el.scrollHeight + 'px'
  requestAnimationFrame(() => {
    el.style.height = '0'
  })
}
</script>
<template>
  <div class="services-accordion-container">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1589C3]"></div>
      <p class="mt-4 text-gray-600">Loading services...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <div class="text-red-600 mb-2">{{ error }}</div>
    </div>
    
    <!-- Services Content -->
    <div v-else class="services-accordion">
      <!-- Dynamically render services -->
      <div 
        v-for="(service, index) in servicesList"
        :key="index"
        class="service-item rounded-lg border-2 transition-all duration-300"
        :class="[
          activeService === (index + 1) 
            ? 'border-[#1589C3] bg-white shadow-sm' 
            : 'border-gray-300 hover:border-[#1A4480] hover:bg-gray-50'
        ]"
      >
        <button
          class="service-header w-full px-6 py-5 flex items-center justify-between text-left"
          @click="toggleService(index + 1)"
          :aria-expanded="activeService === (index + 1)"
          :aria-controls="'service-content-' + (index + 1)"
        >
          <h3 
            class="text-lg md:text-xl font-medium transition-all duration-300"
            :class="activeService === (index + 1) ? 'text-[#1589C3] font-bold' : 'text-[#1A4480]'"
          >
            {{ service.name }}
          </h3>
          
          <div class="chevron-container transition-transform duration-300">
            <svg 
              class="w-5 h-5 md:w-6 md:h-6"
              :class="activeService === (index + 1) ? 'text-[#1589C3] rotate-180' : 'text-[#1A4480]'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        <Transition
          name="expand"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @leave="onLeave"
        >
          <div 
            v-show="activeService === (index + 1)" 
            :id="'service-content-' + (index + 1)"
            class="service-content overflow-hidden"
            role="region"
          >
            <div class="px-6 pb-6 pt-2">
              <!-- Use v-html if description contains HTML that should be rendered -->
              <div 
                v-if="service.description"
                class="text-base leading-relaxed transition-colors duration-300 prose prose-sm max-w-none"
                :class="activeService === (index + 1) ? 'text-[#1589C3]' : 'text-gray-600'"
                v-html="stripHtmlTags(service.description)"
              />
            </div>
          </div>
        </Transition>
      </div>
      <div v-if="!isLoading && !error && servicesList.length === 0" class="text-center py-8 text-gray-600">
        No services available at the moment.
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Main container - Centered with constrained width */
.services-accordion-container {
  @apply w-full px-4 sm:px-6 md:px-8;
}

.services-accordion {
  @apply mx-auto space-y-4;
  max-width: var(--max-width, 48rem); /* 768px default */
}

/* Set max-width based on prop */
.services-accordion {
  max-width: 100%;
}

/* Responsive adjustments */
@media (min-width: 640px) {
  .services-accordion {
    max-width: 42rem; /* 672px */
  }
}

@media (min-width: 768px) {
  .services-accordion {
    max-width: 48rem; /* 768px */
  }
}

@media (min-width: 1024px) {
  .services-accordion {
    max-width: 56rem; /* 896px */
  }
}

/* Service item styling */
.service-item {
  @apply transition-all duration-300 ease-in-out;
}

/* Header styling */
.service-header {
  @apply transition-all duration-300;
}

.service-header:hover {
  @apply transform;
}

/* Focus states for accessibility */
.service-header:focus {
  @apply outline-none;
}

.service-header:focus-visible {
  @apply ring-2 ring-[#1589C3] ring-opacity-50 rounded;
}

/* Chevron animation */
.chevron-container {
  @apply transition-transform duration-300 ease-in-out flex-shrink-0;
}

/* Expand animation for description */
.expand-enter-active,
.expand-leave-active {
  transition: height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .service-header {
    @apply px-4 py-4;
  }
  
  .service-content {
    @apply px-4 pb-4;
  }
}
</style>