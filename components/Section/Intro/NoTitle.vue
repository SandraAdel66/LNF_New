<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <div>
        <div class="text-center max-w-4xl mx-auto py-8">
            <div v-if="props.section.description" class="text-xl text-slate-800 mt-3 text-justify-center" v-html="props.section.description" />
        </div>
        <div class="mt-8 max-w-xs mx-auto sm:max-w-none md:flex md:justify-center sm:space-x-4 space-x-0 sm:space-y-0 space-y-4">
            <div v-if="props.section.buttonOneActive">
                <template v-if="props.section.buttonLinkTypeOne">
                    <NuxtLink v-if="props.section.buttonRouteOne" :to="props.section.buttonRouteOne">
                        <button :class="'btn-' + props.section.buttonStyleOne" class="btn px-6 md:w-fit w-full">
                            <Icon v-if="props.section.buttonIconOne" :name="props.section.buttonIconOne" class="size-5 mr-2" />
                            {{ props.section.buttonTextOne }}
                        </button>
                    </NuxtLink>
                </template>
                <template v-else>
                    <a v-if="props.section.buttonRouteOne" :href="props.section.buttonRouteOne">
                        <button :class="'btn-' + props.section.buttonStyleOne" class="btn px-6 md:w-fit w-full">
                            <Icon v-if="props.section.buttonIconOne" :name="props.section.buttonIconOne" class="size-5 mr-2" />
                            {{ props.section.buttonTextOne }}
                        </button>
                    </a>
                </template>
            </div>
            <div v-if="props.section.buttonTwoActive">
                <template v-if="props.section.buttonLinkTypeTwo">
                    <NuxtLink v-if="props.section.buttonRouteTwo" :to="props.section.buttonRouteTwo">
                        <button :class="'btn-' + props.section.buttonStyleTwo" class="btn px-6 md:w-fit w-full">
                            <Icon v-if="props.section.buttonIconTwo" :name="props.section.buttonIconTwo" class="size-5 mr-2" />
                            {{ props.section.buttonTextTwo }}
                        </button>
                    </NuxtLink>
                </template>
                <template v-else>
                    <a v-if="props.section.buttonRouteTwo" :href="props.section.buttonRouteTwo">
                        <button :class="'btn-' + props.section.buttonStyleTwo" class="btn px-6 md:w-fit w-full">
                            <Icon v-if="props.section.buttonIconTwo" :name="props.section.buttonIconTwo" class="size-5 mr-2" />
                            {{ props.section.buttonTextTwo }}
                        </button>
                    </a>
                </template>
            </div>
        </div>
    </div>
</template>
