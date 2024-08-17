<script lang="ts" setup></script>

<template>
    <div class="text-sm bg-white p-5 border rounded-2xl border-slate-200/75">
        <div class="text-base pb-2 border-b border-dashed flex items-center justify-between gap-5">
            <div>Email</div>
        </div>
        <div class="font-light mt-2 opacity-85" v-html="useSettingValue('public_email')" />
    </div>
</template>
