<script lang="ts" setup>
const newsLetter = ref({
    title: useSettingValue('newsletter_form_title') ?? 'WSA Newsletter',
    content:
        useSettingValue('newsletter_form_description') ??
        'If you need information or have any questions feel free to contact us. To stay up-to-date with our news and exclusive insights we welcome you to subscribe to our newsletter.',
});
</script>
<template>
    <div id="mc_embed_signup" class="h-full intro-y">
        <form
            id="mc-embedded-subscribe-form"
            action="https://worldshippingalliance.us3.list-manage.com/subscribe/post?u=e748bb328902ff61161a65e4c&amp;id=fddb565aa1&amp;f_id=00d9c2e1f0"
            class="validate"
            method="post"
            name="mc-embedded-subscribe-form"
            target="_blank"
        >
            <div id="mc_embed_signup_scroll">
                <h2 class="font-medium uppercase dark:text-primary text-primary text-sm whitespace-nowrap">
                    {{ newsLetter.title }}
                </h2>
                <div class="mt-4 space-y-1">
                    <p class="font-light text-sm text-justify">{{ newsLetter.content }}</p>
                    <div class="flex items-center justify-between gap-4">
                        <div class="mc-field-group mt-2 grow">
                            <input
                                id="mce-EMAIL"
                                autocomplete="email"
                                class="!form-control !form-control-rounded required email"
                                name="EMAIL"
                                placeholder="Email Address"
                                required
                                type="email"
                                value=""
                            />
                            <span id="mce-EMAIL-HELPERTEXT" class="helper_text" />
                        </div>
                        <div class="clear foot mt-2">
                            <button id="mc-embedded-subscribe" class="group btn btn-primary px-4 btn-sm" name="subscribe" type="submit" value="Subscribe">
                                <Icon class="mr-4 size-5 group-hover:mr-2 group-hover:rotate-45 ease-in-out duration-300" name="solar:plain-broken" />
                                <span>Join</span>
                            </button>
                        </div>
                    </div>
                    <div hidden="hidden"><input name="tags" type="hidden" value="14159228" /></div>
                    <div id="mce-responses" class="clear foot">
                        <div id="mce-error-response" class="response" style="display: none" />
                        <div id="mce-success-response" class="response" style="display: none" />
                    </div>
                    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                    <div aria-hidden="true" style="position: absolute; left: -5000px">
                        <input name="b_e748bb328902ff61161a65e4c_fddb565aa1" tabindex="-1" type="text" value="" />
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
