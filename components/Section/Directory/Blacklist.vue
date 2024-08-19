<script lang="ts" setup>
const resources = useResourceStore();
const rows = ref<User[]>([]);
const searchInit = ref<boolean>(false);
const serverParams = ref<UserServerParams>({
    filters: {
        name: null,
        city: null,
        countryId: null,
    },
    networks: [1],
    perPage: 10,
    page: 1,
});

const {
    data: directory,
    status,
    execute,
} = await useApiFetch(`/api/member/blackList`, {
    method: 'POST',
    body: serverParams,
    immediate: false,
});

const isLoading = ref(false);

const resetFilter = async () => {
    isLoading.value = true;
    rows.value = [];
    serverParams.value = {
        filters: {
            name: null,
            city: null,
            countryId: null,
        },
        networks: [1],
        perPage: 10,
        page: 1,
    };

    searchInit.value = false;
    isLoading.value = false;
};

const applyFilter = async () => {
    isLoading.value = true;
    searchInit.value = true;
    await execute();
    if (directory.value) {
        rows.value = (directory.value as ApiResponse).data as User[];
    }
    isLoading.value = false;
};

const changePage = async (value: number) => {
    if (!isNaN(value)) {
        serverParams.value.page = value;
    } else {
        console.error('Invalid page number:', value);
    }
    await applyFilter();
};
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="p-5 bg-slate-50/75 rounded-3xl border">
            <form class="grid lg:grid-cols-12 gap-5" @submit.prevent="applyFilter">
                <FormTextInput v-model="serverParams.filters.name" :disabled="isLoading" class="lg:col-span-3" placeholder="Company Name" rounded />
                <FormSelectInput
                    v-model="serverParams.filters.countryId"
                    :clearable="false"
                    :disabled="isLoading"
                    :select-data="resources.countries"
                    class="lg:col-span-3"
                    imgvalue="imageUrl"
                    keyvalue="id"
                    labelvalue="name"
                    placeholder="Country"
                />
                <FormTextInput v-model="serverParams.filters.city" :disabled="isLoading" class="lg:col-span-2" placeholder="City" rounded />
                <button :disabled="isLoading" class="btn btn-primary gap-2 font-light lg:col-span-2" type="submit">
                    <Icon class="size-5" name="solar:rounded-magnifer-linear" />
                    <span>Submit</span>
                </button>
                <button :disabled="isLoading" class="btn btn-secondary gap-2 font-light lg:col-span-2" type="button" @click="resetFilter">
                    <Icon class="size-5" name="solar:refresh-line-duotone" />
                    <span>Reset</span>
                </button>
            </form>
        </div>
        <div class="p-5 bg-slate-50/75 rounded-3xl border">
            <div v-if="searchInit">
                <template v-if="status !== 'pending'">
                    <table class="table table-report font-light text-sm">
                        <thead>
                            <tr class="uppercase">
                                <th class="text-left">Name</th>
                                <th class="text-left">Country</th>
                                <th class="text-left">WSA ID</th>
                                <th class="text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="searchInit">
                                <template v-if="rows.length > 0">
                                    <tr v-for="row in rows" :key="row.id">
                                        <td>
                                            <div class="flex items-center gap-3">
                                                <NuxtImg :alt="row.name" :src="row.imageUrl" :title="row.name" class="h-12 !rounded-md w-24 object-contain p-1 shrink-0" />
                                                <div class="flex flex-col gap-0.5">
                                                    <div class="flex items-center gap-1.5">
                                                        <span class="truncate font-normal 2xl:max-w-64 max-w-44">{{ row.name }}</span>
                                                        <!--                                                <Icon v-if="(row as User).currentNetworkStatus?.fpp" class="size-5 text-success" name="solar:shield-star-bold" />-->
                                                    </div>

                                                    <div class="text-xs opacity-75 mt-0.5 lowercase truncate 2xl:max-w-64 max-w-44">
                                                        {{ row.email.toLowerCase() }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex items-center gap-2">
                                                <NuxtImg :src="row.country.imageUrl" class="h-10 !rounded-md w-16 object-cover shrink-0 mr-1.5" />
                                                <div>
                                                    <div class="truncate font-normal 2xl:max-w-64 max-w-44">
                                                        {{ row.country.name }}
                                                    </div>
                                                    <div class="capitalize font-light text-xs opacity-80">
                                                        {{ row.city.toLowerCase() }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="row.currentNetworkStatus && row.currentNetworkStatus?.status">
                                                <ProfileMemberStatus :type="row.currentNetworkStatus?.status as string" />
                                            </div>
                                        </td>
                                        <td>
                                            <ProfileMembershipType :type="row.currentNetworkStatus?.type as string" />
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="5">
                                            <div class="py-8 font-lg text-center">No members found</div>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr v-for="i in serverParams.perPage" :key="i">
                                    <td colspan="5">
                                        <div class="h-12 !opacity-50 animate-pulse" />
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </template>
            </div>
            <div v-else class="py-8 font-lg text-center bg-white rounded-3xl border border-dashed text-slate-500 font-light">
                You can search for members using the above form...
            </div>
        </div>
        <template v-if="searchInit">
            <TablePagination :page="serverParams.page" :pending="status === 'pending'" :rows="directory as ApiResponse" class="mx-12" @change-page="changePage" />
        </template>
    </div>
</template>
