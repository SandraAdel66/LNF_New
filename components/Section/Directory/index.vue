<script lang="ts" setup>
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const props = defineProps<{
    section: PageSection;
}>();
const resources = useResourceStore();
const rows = ref<User[]>([]);
const searchInit = ref<boolean>(false);
const sortByList = [
    { name: 'Sort By Type', id: 'type_company' },
    { name: 'Sort By Name', id: 'name' },
    { name: 'Sort By Country', id: 'country_id' },
];
const sortingDirections = [
    { name: 'Direction A : Z', id: 'asc' },
    { name: 'Direction Z : A', id: 'desc' },
];
const serverParams = ref<UserServerParams>({
    filters: {
        name: null,
        city: null,
        countryId: null,
    },
    networks: [1],
    orderBy: 'type_company',
    orderByDirection: 'asc',
    perPage: 9,
    page: 1,
});

const {
    data: directory,
    status,
    refresh,
    execute,
    error,
} = await useApiFetch(`/api/member/directory`, {
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
        orderBy: 'type_company',
        orderByDirection: 'asc',
        perPage: 9,
        page: 1,
    };

    searchInit.value = false;
    isLoading.value = false;
};

const rules = ref({
    countryId: { required },
});
const v$ = useVuelidate(rules, serverParams.value.filters);

const applyFilter = async () => {
    isLoading.value = true;
    searchInit.value = true;
    const result = await v$.value.$validate();
    if (!result) {
        isLoading.value = false;
        searchInit.value = false;
        useToast({ title: 'Error', message: 'Please select a country', type: 'error', duration: 5000 });
        return false;
    }
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
const userStore = useUserStore();
const headerSettings = {
    loginButtonActive: useSettingValue('login_button_active') ?? true,
    registerButtonActive: useSettingValue('register_button_active') ?? true,
    loginButton: useSettingValue('login_button') ?? {
        label: 'Login',
        target: '_self',
        url: '/login',
        style: 'primary',
        icon: 'solar:login-3-outline',
    },
    registerButton: useSettingValue('register_button') ?? {
        label: 'Application Form',
        target: '_self',
        url: '/application-form',
        style: 'warning',
        icon: 'solar:shield-star-outline',
    },
};
</script>

<template>
    <div class="flex flex-col gap-5">
        <template v-if="userStore.token">
            <div class="p-5 bg-slate-50/75 rounded-3xl border">
                <form class="grid lg:grid-cols-4 gap-5" @submit.prevent="applyFilter">
                    <FormSelectInput
                        v-model="serverParams.filters.countryId"
                        :clearable="false"
                        :disabled="isLoading"
                        :errors="v$.countryId.$errors"
                        :select-data="resources.countries"
                        imgvalue="imageUrl"
                        keyvalue="id"
                        labelvalue="name"
                        placeholder="Country"
                    />
                    <FormTextInput v-model="serverParams.filters.city" :disabled="isLoading" placeholder="City" rounded />
                    <FormSelectInput v-model="serverParams.orderBy" :disabled="isLoading" :select-data="sortByList" keyvalue="id" labelvalue="name" placeholder="Sort by" />
                    <FormSelectInput
                        v-model="serverParams.orderByDirection"
                        :disabled="isLoading"
                        :select-data="sortingDirections"
                        keyvalue="id"
                        labelvalue="name"
                        placeholder="Sort Direction"
                    />
                    <FormTextInput v-model="serverParams.filters.name" :disabled="isLoading" class="lg:col-span-2" placeholder="Company Name" rounded />
                    <button :disabled="isLoading" class="btn btn-primary gap-2 font-light" type="submit">
                        <Icon class="size-5" name="solar:rounded-magnifer-linear" />
                        <span>Submit</span>
                    </button>
                    <button :disabled="isLoading" class="btn btn-secondary gap-2 font-light" type="button" @click="resetFilter">
                        <Icon class="size-5" name="solar:refresh-line-duotone" />
                        <span>Reset</span>
                    </button>
                </form>
            </div>
            <div class="p-5 bg-slate-50/75 rounded-3xl border">
                <div v-if="searchInit">
                    <template v-if="status !== 'pending'">
                        <div class="md:block hidden">
                            <table class="table table-report font-light text-sm">
                                <thead>
                                    <tr class="uppercase">
                                        <th class="text-left">Name</th>
                                        <th class="text-left">Country</th>
                                        <th class="text-left">HQ/Branch</th>
                                        <th class="text-right">Action</th>
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
                                                    <div>
                                                        <ProfileMemberType :status="row.typeCompany as string" />
                                                    </div>
                                                </td>
                                                <td class="text-right">
                                                    <NuxtLink :href="row.wsaId === (userStore.user as User).wsaId ? '/dashboard' : '/member/' + row.wsaId" target="_blank">
                                                        <button class="btn btn-secondary btn-sm gap-3 font-light px-4" type="button">
                                                            <Icon class="size-4" name="solar:eye-line-duotone" />
                                                            View
                                                        </button>
                                                    </NuxtLink>
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
                                                <div class="h-12 !opacity-50" />
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                        <ul class="block md:hidden space-y-5">
                            <li v-for="row in rows" :key="row.id" class="p-5 bg-white/50 border rounded-xl divide-y divide-dashed text-right">
                                <div class="py-3 flex items-start justify-between gap-3">
                                    <NuxtImg
                                        :alt="row.name"
                                        :src="row.imageUrl"
                                        :title="row.name"
                                        class="ring-4 ring-slate-400/10 h-12 !rounded-md w-24 object-contain p-1 shrink-0 bg-white"
                                    />
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
                                <div class="py-3 flex items-start justify-between gap-2">
                                    <NuxtImg :src="row.country.imageUrl" class="ring-4 ring-slate-400/10 h-10 !rounded-md w-16 object-cover shrink-0 mr-1.5" />
                                    <div>
                                        <div class="truncate font-normal 2xl:max-w-64 max-w-44">
                                            {{ row.country.name }}
                                        </div>
                                        <div class="capitalize font-light text-xs opacity-80">
                                            {{ row.city.toLowerCase() }}
                                        </div>
                                    </div>
                                </div>
                                <div class="py-3 flex items-center justify-between gap-5">
                                    <div class="opacity-75 text-sm font-light text-left">HQ/BRANCH</div>
                                    <ProfileMemberType :status="row.typeCompany as string" />
                                </div>
                                <div class="py-3">
                                    <NuxtLink :href="row.wsaId === (userStore.user as User).wsaId ? '/dashboard' : '/member/' + row.wsaId" target="_blank">
                                        <button class="btn btn-primary w-full gap-3" type="button">
                                            <Icon class="size-4" name="solar:eye-line-duotone" />
                                            View
                                        </button>
                                    </NuxtLink>
                                </div>
                            </li>
                        </ul>
                    </template>
                </div>
                <div v-else class="py-8 font-lg text-center bg-white rounded-3xl border border-dashed text-slate-500 font-light">
                    You can search for members using the above form...
                </div>
            </div>
            <template v-if="searchInit">
                <TablePagination :page="serverParams.page" :pending="status === 'pending'" :rows="directory as ApiResponse" class="mx-12" @change-page="changePage" />
            </template>
        </template>
        <template v-else>
            <div class="flex flex-col gap-5">
                <div class="text-center text-lg font-normal opacity-85">Login or Apply for membership to view WSA Elite Directory</div>
                <div class="flex items-center gap-5 place-content-center">
                    <NuxtLink v-if="headerSettings.registerButtonActive" :target="headerSettings.registerButton.target" :to="headerSettings.registerButton.url">
                        <button :class="'btn  btn-sm px-5 btn-' + headerSettings.registerButton.style">
                            <Icon v-if="headerSettings.registerButton.icon" :name="headerSettings.registerButton.icon" class="size-5 mr-2" />
                            <span>{{ headerSettings.registerButton.label }}</span>
                        </button>
                    </NuxtLink>
                    <NuxtLink v-if="headerSettings.loginButtonActive" :target="headerSettings.loginButton.target" :to="headerSettings.loginButton.url">
                        <button :class="'btn  btn-sm px-5 btn-' + headerSettings.loginButton.style">
                            <Icon v-if="headerSettings.loginButton.icon" :name="headerSettings.loginButton.icon" class="size-5 mr-2" />
                            <span>{{ headerSettings.loginButton.label }}</span>
                        </button>
                    </NuxtLink>
                </div>
                <div class="text-sm mt-12 w-full grow px-6">
                    <div class="grid grid-cols-3 gap-5 items-center justify-between text-left">
                        <div class="p-3">Company Name</div>
                        <div class="p-3">Country</div>
                        <div class="text-right p-3">View</div>
                    </div>
                    <ul class="mt-1.5 space-y-3">
                        <li
                            v-for="line in 5"
                            :key="line"
                            class="p-3 bg-white border !border-slate-100 rounded-lg uppercase grid grid-cols-3 gap-5 items-center justify-between text-left"
                        >
                            <div class="flex items-center gap-3">
                                <div class="bg-slate-200 blur-sm h-10 w-16 rounded-md" />
                                <div>
                                    <div class="bg-slate-200 blur-sm h-5 w-44 rounded-md" />
                                    <div class="bg-slate-200 blur-sm h-4 w-24 mt-1.5 rounded-md" />
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="bg-slate-200 blur-sm h-8 w-12 rounded-md" />
                                <div>
                                    <div class="bg-slate-200 blur-sm h-4 w-16 rounded-md" />
                                    <div class="bg-slate-200 blur-sm h-3 w-24 mt-1.5 rounded-md" />
                                </div>
                            </div>
                            <div class="place-content-end flex">
                                <div class="bg-slate-200 blur-sm h-5 w-12 rounded-md" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
    </div>
</template>
