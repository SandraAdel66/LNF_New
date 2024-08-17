<script setup lang="ts">
useSeoMeta({
    title: 'About',
});
const selectedSectionIndex = ref(0);
const toggleSectionIndex = (index: number) => {
    selectedSectionIndex.value = index;
};
const sections = ref([
    {
        id: 1,
        name: 'Who We Are',
        description:
            'In an era where change is the only constant, and innovation is the engine of growth, we find ourselves at a crossroads. How do we navigate the complexities of global trade, regulatory landscapes, and technological disruptions? The answer lies in unity, collaboration, and collective innovation.<br>LNF, the Logistics Networks Federation of Freight Forwarders, is a non-governmental, membership-based organization founded in 2023 and headquartered in New York, USA. We represent service providers in logistics and freight networks and supply chain management. <br> Through our services and publications, we support various areas of logistics activity and help formulate industry policy on critical logistics issues. We promote trade facilitation and best practices among the freight-forwarding community.',
    },
    {
        id: 2,
        name: 'The Core Idea',
        description:
            'The Logistics Network Federation (LNF) stands as a beacon of cooperative strength and shared vision transcending the traditional boundaries of competition.  It is the embodiment of a powerful idea:<br> At the heart of the LNF lies a simple yet profound idea: unity in diversity. By bringing together freight and logistics networks from across the globe, we harness a wealth of experience, perspectives, and capabilities. However, with this vast potential also come our shared challenges—increasing member networks, ensuring profitability, solidifying the credibility of our financial protection schemes, and organizing hallmark events that epitomize our collaborative spirit and shared expertise.<br> The LNF is about creating a symbiotic ecosystem where every network flourishes, transforming individual successes into shared victories to achieve unprecedented success.',
    },
    {
        id: 3,
        name: 'Mission and Vision',
        description:
            "Vision: To establish the most trusted and innovative Federation that sets global freight network industry standards and unites respected networks from every corner of the globe, setting international benchmarks within our industry.<br> Mission: To bring together freight networks from around the globe, offering them strong support, resources, and opportunities to work together. We aim to lead in innovation and standards by valuing the diverse ideas and methods our members offer. Through promoting, learning, and sustainable actions, we strive to improve our members' competitiveness and efficiency worldwide, creating a welcoming space where everyone's input matters, and working towards a stronger and united industry.",
    },
    {
        id: 4,
        name: 'Governance',
        description:
            "<h3>Governance Structure of LNF</h3><br> The governance of LNF is structured around the General Meeting, the Presidency, the Extended Board, and the Headquarters Team, each playing a vital role in the organization’s operations and strategic direction.<br> <h3>General Meeting</h3><br> The LNF General Meeting is the paramount governing body of the organization, convening annually to establish the course for LNF's work through the passage of key resolutions. It is responsible for electing leadership and members, validating the annual report, budget, and financial statements, and approving essential business conditions and regulations. This annual assembly sets strategic priorities and ensures accountability within the organization.",
    },
    {
        id: 5,
        name: 'Board Team',
        description:
            'The LNF board consists of a President, Vice President, Secretary, and Treasurer, elected by the Board of Directors from its members. Each board member serves a term of two years. The Board of Directors is responsible for adopting resolutions according to the voting procedures outlined in the by-laws.<br><h3>Presidency</h3><br>The Presidency is responsible for the executive management of LNF, overseeing daily operations, and ensuring the implementation of strategic plans and policies set by the General Meeting. The Presidency drives the organization toward its objectives, makes critical decisions, and maintains overall organizational health.<h3>Headquarters Team</h3><br>Under the direction of the Presidency, the Headquarters Team is responsible for determining and executing LNF’s strategic plan. This team manages the day-to-day implementation of strategies, projects, and initiatives that align with the organization’s goals and objectives, playing a crucial role in translating the strategic vision into actionable plans.',
    },
]);
</script>

<template>
    <div class="container mt-8 md:px-12 px-6">
        <div class="grid lg:grid-cols-12 gap-5">
            <div class="lg:col-span-3 p-5 bg-white/75 rounded-xl">
                <ul class="list-disc list-inside">
                    <li v-for="(heading, index) in sections" :key="index">
                        <button
                            :disabled="selectedSectionIndex === index"
                            type="button"
                            :class="[selectedSectionIndex === index ? 'opacity-100 text-primary' : 'opacity-50', 'py-1 font-semibold hover:text-primary']"
                            @click="toggleSectionIndex(index)"
                        >
                            <span class="text-sm uppercase">{{ heading.name }}</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="lg:col-span-9 prose prose-slate">
                <div v-html="sections[selectedSectionIndex].description" />
            </div>
        </div>
    </div>
</template>
