<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <div>
        <div class="text-center max-w-4xl mx-auto py-8">
            <div v-if="props.section.postTitle" class="text-lg font-medium" v-html="props.section.postTitle" />
            <div v-if="props.section.title" class="text-3xl lg:text-4xl font-bold text-primary" v-html="props.section.title" />
            <div v-if="props.section.des" class="text-xl font-light mt-3 text-justify-center" v-html="props.section.des" />
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
        <div v-if="props.section.children.length > 0" class="relative max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch md:max-w-2xl lg:max-w-none">
            <div aria-hidden="true" class="absolute top-1/2 w-full h-1 bg-gradient-to-r from-primary to-primary-hover hidden lg:block" />
            <div
                v-for="(item, index) in props.section.children"
                :key="item.id"
                class="hover:scale-105 transition-all relative flex h-full flex-col border items-center p-6 bg-white rounded-2xl shadow-sm"
            >
                <div class="flex justify-center items-center h-12 w-12 rounded-tl-full rounded-tr-full rounded-bl-full bg-primary text-white font-bold mb-3 text-lg">
                    {{ index + 1 }}
                </div>
                <h4 class="text-lg font-bold text-primary leading-snug tracking-tight mb-1">{{ item.title }}</h4>
                <p class="text-center font-light text-base line-clamp-4">{{ item.des }}</p>
            </div>
        </div>
    </div>
</template>
