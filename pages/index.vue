<script setup lang="ts">
const slug = ref('home');

const { data: page, status } = await useApiFetch(`/api/get-page/${slug.value}`, {
    lazy: true,
    transform: (page) => (page as ApiResponse).data as Page,
});

useSeoMeta({
    title: (page.value as Page)?.name,
    description: (page.value as Page)?.des,
});
const texts = [
    {
        id: 'web-development',
        text: 'Uniting for a Stronger Tomorrow',
        icon: 'solar:code-square-linear',
        description:
            'LNF stands as a beacon of cooperative strength and shared vision, transcending the traditional boundaries of competition. By banding together, we leverage our combined expertise, resources, and networks to achieve unprecedented success.',
    },
    {
        id: 'graphic-design',
        text: 'Financial Protection',
        icon: 'solar:pallete-2-linear',
        description: 'Stunning, impactful designs tailored to your brand. Elevate your identity and captivate your audience with our creative expertise.',
    },
    {
        id: 'media-production',
        text: 'Increasing Membership',
        icon: 'solar:special-effects-linear',
        description: "High-quality video and photography production to tell your brand's story and engage your audience. Let's create captivating visuals together.",
    },
    {
        id: 'marketing-strategies',
        text: 'Mutual Benefits',
        icon: 'solar:chat-square-2-linear',
        description: 'Tailored marketing strategies, including SEO and social media, to reach your target audience effectively and drive business growth.',
    },
];
const currentText = ref(texts[0].text);
const currentId = ref(texts[0].id);
const currentIcon = ref(texts[0].icon);
const currentDescription = ref(texts[0].description);
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
            currentIcon.value = texts[textIndex].icon;
            currentDescription.value = texts[textIndex].description;
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
const skills = ref([
    { category: 'web-developing', name: 'PHP', icon: 'simple-icons:php' },
    { category: 'web-developing', name: 'Javascript', icon: 'akar-icons:javascript-fill' },
    { category: 'web-developing', name: 'Typescript', icon: 'akar-icons:typescript-fill' },
    { category: 'web-developing', name: 'Laravel', icon: 'simple-icons:laravel' },
    { category: 'web-developing', name: 'Vue js', icon: 'mdi:vuejs' },
    { category: 'web-developing', name: 'Nuxt js', icon: 'tabler:brand-nuxt' },
    { category: 'web-developing', name: 'Wordpress', icon: 'mdi:wordpress' },
    { category: 'web-developing', name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
]);
const activeSkillCategoryId = ref('all');
const skillsCategories = ref([
    { id: 'all', name: 'All', icon: 'solar:align-left-linear' },
    { id: 'web-developing', name: 'Web Developing', icon: 'solar:code-square-linear' },
    { id: 'graphic-design', name: 'Graphic Design', icon: 'solar:pallete-2-linear' },
    { id: 'media-production', name: 'Media Production', icon: 'solar:special-effects-linear' },
    { id: 'marketing-strategies', name: 'Marketing Strategies', icon: 'solar:chat-square-2-linear' },
]);
const selectSkillCategoryId = (id: string) => {
    activeSkillCategoryId.value = id;
};
</script>

<template>
    <div class="mt-8">
        <section class="lg:min-h-[30rem] grid lg:grid-cols-12 gap-5 items-center container px-6">
            <div class="flex items-center lg:col-span-8 justify-start">
                <div class="flex flex-col gap-3">
                    <div class="-intro-y">
                        <div class="font-normal 2xl:text-xl text-lg">Logistics Network Federation</div>
                        <div :class="'font-extrabold 2xl:text-5xl text-4xl mt-2 leading-tight text-primary'">{{ currentText }}</div>
                    </div>
                    <!--                    <p :class="['font-light', 'opacity-85', 'text-xl', { '-intro-x': addIntroClass }]">-->
                    <!--                        {{ currentDescription }}-->
                    <!--                    </p>-->
                    <div class="mt-5 flex items-center gap-5">
                        <NuxtLink href="/services">
                            <button class="btn w-full btn-primary btn-rounded gap-3 px-6">
                                <Icon name="solar:maximize-square-2-linear" class="size-6" />
                                <span>Services</span>
                            </button>
                        </NuxtLink>
                        <NuxtLink href="/portfolio">
                            <button class="btn w-full btn-secondary btn-rounded gap-3 px-6">
                                <Icon name="solar:documents-linear" class="size-6" />
                                <span>Apply Now</span>
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="flex items-center lg:col-span-4 justify-end">
                <div class="flex flex-col grow place-items-end gap-5 max-w-[30rem]">
                    <!--                    <div-->
                    <!--                        v-for="item in texts"-->
                    <!--                        :key="item.id"-->
                    <!--                        :class="[currentId === item.id ? 'w-full h-32 p-5' : 'p-3 flex items-center place-content-center', 'bg-primary']"-->
                    <!--                        class="rounded-2xl size-12 ease-in-out duration-[1s] overflow-hidden text-slate-900"-->
                    <!--                    >-->
                    <!--                        <TransitionFade :duration="{ enter: 300, leave: 0 }">-->
                    <!--                            <Icon v-if="currentId !== item.id" :name="item.icon" class="w-full h-full" />-->
                    <!--                            <div v-else class="text-lg">{{ currentDescription }}</div>-->
                    <!--                        </TransitionFade>-->
                    <!--                    </div>-->
                </div>
            </div>
        </section>
        <section class="relative bg-slate-50 py-12">
            <div class="container px-6">
                <div class="text-center">
                    <span class="text-3xl font-bold"><span class="font-medium text-primary mr-2">The Core</span>Idea</span>
                </div>
                <div class="max-w-5xl mx-auto text-base mt-3 text-center">
                    The Logistics Network Federation (LNF) stands as a beacon of cooperative strength and shared vision transcending the traditional boundaries of competition. It
                    is the embodiment of a powerful idea: At the heart of the LNF lies a simple yet profound idea: unity in diversity. By bringing together freight and logistics
                    networks from across the globe, we harness a wealth of experience, perspectives, and capabilities. However, with this vast potential also come our shared
                    challenges—increasing member networks, ensuring profitability, solidifying the credibility of our financial protection schemes, and organizing hallmark events
                    that epitomize our collaborative spirit and shared expertise. The LNF is about creating a symbiotic ecosystem where every network flourishes, transforming
                    individual successes into shared victories to achieve unprecedented success.
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
        <section class="relative bg-slate-50 py-12">
            <div class="container px-6">
                <div class="text-center">
                    <span class="text-3xl font-bold"><span class="font-medium text-primary mr-2">About</span>LNF</span>
                </div>
                <div class="max-w-5xl mx-auto text-base mt-3 text-center">
                    In an era where change is the only constant, and innovation is the engine of growth, we find ourselves at a crossroads. How do we navigate the complexities of
                    global trade, regulatory landscapes, and technological disruptions? The answer lies in unity, collaboration, and collective innovation. LNF, the Logistics
                    Networks Federation of Freight Forwarders, is a non-governmental, membership-based organization founded in 2023 and headquartered in New York, USA. We represent
                    service providers in logistics and freight networks and supply chain management. Through our services and publications, we support various areas of logistics
                    activity and help formulate industry policy on critical logistics issues. We promote trade facilitation and best practices among the freight-forwarding
                    community.
                </div>
            </div>
        </section>
        <section class="relative white py-12">
            <div class="flex flex-col gap-5">
                <div class="text-center mt-8">
                    <span class="text-3xl font-bold"><span class="font-medium text-primary mr-2">Our</span>Networks</span>
                </div>
                <div class="container flex flex-col gap-8 px-6 py-5">
                    <ul class="grid md:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-8 lg:grid-cols-8 p-5">
                        <li v-for="skill in skills" :key="skill.icon" class="flex place-content-center group intro-x">
                            <div class="flex flex-col flex-wrap gap-2 text-center opacity-50 group-hover:opacity-100 ease-in-out duration-300">
                                <Icon :name="skill.icon" class="size-16 mx-auto" />
                                <span class="group-hover:text-primary transition-colors font-medium whitespace-nowrap">{{ skill.name }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
