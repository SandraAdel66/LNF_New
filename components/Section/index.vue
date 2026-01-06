<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
    id: string;
}>();
</script>

<template>
    <div :id="id">
        <SectionIntro v-if="section.type === 'intro' || section.type === 'grid-home-section'" :section="props.section" />
        <SectionEventsGrid v-if="section.type === 'events-grid'" :section="props.section" />
        <SectionTeam v-if="section.type === 'team-grid'" :section="props.section" />
        <SectionNetwork v-if="section.type === 'network-grid'" :section="props.section" />
        <SectionIntroNoTitle v-if="section.type === 'intro-no-title'" :section="props.section" />
        <SectionDefaultWithImage v-else-if="section.type === 'image-banner-section'" :section="props.section" />
        <SectionBenefitsGrid v-else-if="section.type === 'benefits-grid'" :section="props.section" />
        <SectionBenefitsList v-else-if="section.type === 'benefits-list'" :section="props.section" />
        <SectionStatus v-else-if="section.type === 'site-states'" :section="props.section" />
        <SectionTestimonials v-else-if="section.type === 'testimonials-slider'" :section="props.section" />
        <SectionPartners v-else-if="section.type === 'partners-slider'" :section="props.section" />
        <SectionCallToAction v-else-if="section.type === 'cta'" :section="props.section" />
        <SectionEvents v-else-if="section.type === 'events-list'" :section="props.section" />
        <SectionDirectory v-else-if="section.type === 'network-directory'" :section="props.section" />
        <SectionDirectoryBlacklist v-else-if="section.type === 'blacklisted-directory'" :section="props.section" />
        <SectionPolicy v-else-if="section.type === 'privacy-policy'" :section="props.section" />
        <SectionFaq v-else-if="section.type === 'faqs-list'" :section="props.section" />
        <SectionIncoterms v-else-if="section.type === 'incoterms-list'" :section="props.section" />
        <SectionFreightCalculator v-else-if="section.type === 'freight-tools'" :section="props.section" />
        <SectionContactForm v-else-if="section.type === 'contact-form'" :section="props.section" />
        <SectionDefault v-else-if="section.type === 'about-right-image' || section.type === 'about-left-image' || section.type === 'about-no-image'" :section="props.section" />
        <!--        <div v-else>-->
        <!--            {{ section }}-->
        <!--        </div>-->
        <!--        <div v-if="section.type === 'benefits-grid'" class="hero-divider-top z-10">-->
        <!--            <svg data-name="Layer 1" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">-->
        <!--                <path-->
        <!--                    class="divider-fill"-->
        <!--                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"-->
        <!--                />-->
        <!--            </svg>-->
        <!--        </div>-->
    </div>
</template>
