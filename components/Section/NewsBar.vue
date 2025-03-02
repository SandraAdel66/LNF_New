<template>
    <div v-if="status !== 'pending'" class="text-base relative">
        <div class="absolute top-5 z-40 w-full flex justify-center">
            <div v-if="articles.data.length > 0" class="max-w-5xl mx-auto overflow-hidden">
                <div class="bg-white rounded-full overflow-hidden border-2 border-primary">
                    <div class="flex items-center">
                        <div class="flex items-center py-2 pl-2 pr-4 bg-primary rounded-l-full text-white z-40">
                            <Icon class="size-5 mr-2" name="solar:global-line-duotone" />
                            <span>News</span>
                        </div>
                        <div class="news-container p-2 flex items-center whitespace-nowrap space-x-5">
                            <div class="news-slides flex items-center space-x-5 overflow-x-hidden whitespace-nowrap">
                                <template v-for="post in articles.data" :key="post.id">
                                    <NuxtLink :to="'/article/' + post.slug" class="text-slate-500 hover:text-primary">
                                        {{ post.name }}
                                    </NuxtLink>
                                    <ApplicationIcon class="w-6 h-6 text-primary" />
                                </template>
                            </div>
                            <div class="news-slides flex items-center space-x-5 overflow-x-hidden whitespace-nowrap">
                                <template v-for="post in articles.data" :key="post.id">
                                    <NuxtLink :to="'/article/' + post.slug" class="text-slate-500 hover:text-primary">
                                        {{ post.name }}
                                    </NuxtLink>
                                    <ApplicationIcon class="w-6 h-6 text-primary" />
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-5xl mx-auto overflow-hidden py-1 text-sm px-5 bg-danger text-white rounded-full">
                No articles has been found to show in the home slider, Please disable or add news.
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: articles, status } = await useApiFetch(`/api/news-public`, {
    lazy: true,
});
</script>
<style lang="scss" scoped>
@keyframes slide {
    from {
        transform: translate(0);
    }
    to {
        transform: translate(-100%);
    }
}

.news-slides {
    animation: 90s slide infinite linear;
}

.news-container:hover .news-slides {
    animation-play-state: paused;
}

.news-container:before,
.news-container:after {
    position: absolute;
    top: 0;
    width: 50px;
    height: 100%;
    z-index: 2;
    content: '';
}

.news-container {
    position: relative;
    inset: 0;
}

.news-container:before {
    left: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

.news-container:after {
    right: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}
</style>
