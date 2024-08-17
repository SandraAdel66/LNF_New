<script lang="ts" setup>
const props = defineProps<{
    data: FAQ;
}>();

const open = ref(false);

const toggleOpen = () => {
    open.value = !open.value;
};
</script>

<template>
    <div>
        <div :class="[open ? 'bg-primary text-white' : 'bg-slate-50', 'flex items-center gap-5 py-1.5 border rounded-full my-1 px-5 cursor-pointer']" @click="toggleOpen">
            <Icon :name="open ? 'solar:minus-circle-linear' : 'solar:add-circle-outline'" class="size-5 opacity-50" />
            <div>{{ props.data.name }}</div>
        </div>
        <TransitionExpand>
            <div v-if="open" class="rounded-2xl text-base text-justify my-1 p-3 font-light bg-slate-50" v-html="props.data.des" />
        </TransitionExpand>
    </div>
</template>
