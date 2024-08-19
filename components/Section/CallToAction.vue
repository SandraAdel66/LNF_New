<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();

const userStore = useUserStore();
</script>

<template>
    <div v-if="!userStore.token" class="py-5 px-8 section-bg rounded-3xl text-white">
        <div class="flex md:flex-row flex-col items-center gap-5">
            <div>
                <div v-if="props.section.title" class="text-2xl" v-html="props.section.title" />
                <div v-if="props.section.des" class="mt-2 font-extralight leading-6" v-html="props.section.des" />
            </div>
            <div v-if="props.section.buttonOneActive" class="whitespace-nowrap">
                <template v-if="props.section.buttonLinkTypeOne">
                    <NuxtLink :href="props.section.buttonRouteOne">
                        <button :class="'btn  px-6 btn-' + props.section.buttonStyleOne">
                            <Icon v-if="props.section.buttonIconOne" :name="props.section.buttonIconOne" class="size-5 mr-2" />
                            {{ props.section.buttonTextOne }}
                        </button>
                    </NuxtLink>
                </template>
                <template v-else>
                    <a :href="props.section.buttonRouteOne">
                        <button :class="'btn  px-6 btn-' + props.section.buttonStyleOne">
                            <Icon v-if="props.section.buttonIconOne" :name="props.section.buttonIconOne" class="size-5 mr-2" />
                            {{ props.section.buttonTextOne }}
                        </button>
                    </a>
                </template>
            </div>
        </div>
    </div>
</template>
