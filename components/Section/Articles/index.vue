<script lang="ts" setup>
const serverParams = ref({
    page: 1,
});

const {
    data: articles,
    status,
    refresh,
} = await useApiFetch(`/api/get-article`, {
    lazy: true,
    params: serverParams.value,
});
const nextPage = async () => {
    const lastPageNumber = (articles.value as ApiResponse).meta.last_page;
    if (lastPageNumber === serverParams.value.page) {
        return false;
    } else {
        serverParams.value.page++;
        await refresh();
    }
};
const lastPage = async () => {
    const lastPageNumber = (articles.value as ApiResponse).meta.last_page;
    if (serverParams.value.page === 1) {
        return false;
    } else {
        serverParams.value.page--;
        await refresh();
    }
};
</script>

<template>
    <div>
        <div v-if="status !== 'pending'" class="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-5">
            <template v-for="article in (articles as ApiResponse).data" :key="article.id">
                <SectionArticlesCard :data="article" />
            </template>
        </div>
        <div class="flex items-center gap-5 justify-between my-5">
            <button type="button" class="btn btn-primary" :disabled="status === 'pending' || serverParams.page === 1" @click="lastPage">Previous</button>
            <button type="button" class="btn btn-primary" :disabled="status === 'pending' || articles?.meta?.last_page === serverParams.page" @click="nextPage">Next</button>
        </div>
    </div>
</template>
