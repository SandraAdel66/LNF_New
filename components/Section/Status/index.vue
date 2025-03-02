<script lang="ts" setup>
const states = [
    { id: 1, name: 'Members', number: useSettingValue('status_members_count'), icon: 'members' },
    { id: 2, name: 'Countries', number: useSettingValue('status_countries_count'), icon: 'countries' },
    { id: 3, name: 'Cities', number: useSettingValue('status_cities_count'), icon: 'cities' },
    { id: 4, name: 'Employees', number: useSettingValue('status_employees_count'), icon: 'employees' },
];
</script>

<template>
    <div class="relative">
        <div class="bg-primary section-bg rounded-3xl md:mx-auto 2xl:max-w-7xl max-w-5xl p-2 -mt-8 mx-5">
            <ul class="md:grid hidden md:grid-cols-4 md:divide-dashed md:divide-x !divide-white/10 text-center items-center">
                <li v-for="(item, index) in states" :key="index" class="p-2 intro-x text-white">
                    <ApplicationStatusIcon :name="item.icon" class="w-12 h-12 mx-auto fill-current stroke-[1px]" />
                    <div class="mt-4 text-xl">{{ item.name }}</div>
                    <SectionStatusCounter :end-value="item.number" :suffix="'+'" class="mt-2 text-4xl font-bold" />
                </li>
            </ul>
            <ul class="md:hidden sm:grid hidden grid-cols-2 md:divide-dashed md:divide-x !divide-white/10 text-center items-center">
                <li
                    v-for="(item, index) in states"
                    :key="index"
                    class="p-2 intro-x text-white last:border-t last:border-l first:border-r first:border-b border-white/10 border-dashed"
                >
                    <ApplicationStatusIcon :name="item.icon" class="w-12 h-12 mx-auto fill-current stroke-[1px]" />
                    <div class="mt-4 text-xl">{{ item.name }}</div>
                    <SectionStatusCounter :end-value="item.number" :suffix="'+'" class="mt-2 text-4xl font-bold" />
                </li>
            </ul>
            <ul class="sm:hidden grid grid-cols-1 divide-dashed divide-y !divide-white/10 text-center items-center">
                <li v-for="(item, index) in states" :key="index" class="p-2 intro-x text-white">
                    <ApplicationStatusIcon :name="item.icon" class="w-12 h-12 mx-auto fill-current stroke-[1px]" />
                    <div class="mt-4 text-xl">{{ item.name }}</div>
                    <SectionStatusCounter :end-value="item.number" :suffix="'+'" class="mt-2 text-4xl font-bold" />
                </li>
            </ul>
        </div>
    </div>
</template>
