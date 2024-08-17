<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
const policies = ref([
    {
        id: 'what-is-personal-data',
        title: 'What is Personal Data?',
        content: [
            'Personal data is defined by the General Data Protection Regulation as “Personal data is all data that can provide information about an identified or identifiable natural person. This includes, for example, a personal e-mail address.”',
            'Personal data is, in simpler terms, any information about you that enables you to be identified. Personal data covers obvious information such as your name and contact details, but it also covers less obvious information such as identification numbers, electronic location data, and other online identifiers.',
            '<b>Information You Give Us:</b> We receive and store any information you enter on our Website or give us in any other way related about becoming a member. You can choose not to provide certain information, but then you might not be able to take advantage of many of our features. We use the information that you provide for such purposes as responding to your requests, Becoming a member, improving our services, and communicating with you.',
            '<b>Information from Other Sources:</b> We might receive information about you from other sources and add it to our account information, for example your website.',
        ],
    },
    {
        id: 'collection-and-use-of-data',
        title: 'Collection and use of data',
        content: [
            'Personal information you have provided when applying for WSA-membership and / or registering to our events and / or during phone-calls, mails, meetings and / or any other way of communication will continue to be taken care of to the best of our abilities and will not be used for commercial purposes.',
            'While applying for WSA-membership you allow us to use your data to provide member services such as informing you of newsflashes, member news, your membership invoices, as well as publishing membership directory on WSA.com so as to enable you and connect you with the group. Our Directories are based on the information you provided. They are for the sole use of WSA-members and may not be distributed nor copied to third parties. Exactness of information in the Directory is in your own interest. Your cooperation for same is therefore highly appreciated.',
        ],
    },
    {
        id: 'who-will-we-share-your-information-with',
        title: 'Who will we share your information with?',
        content: [
            'Your information will only be shared internally with our members and users in good standing of our organization in order to facilitate all members and users to network as the main objective of our services. The access to the shared information is password protected.',
            'Sometimes we will need to share personal information we hold about you with other organizations that we work with or who provide services on our behalf, for example:',
            "<ul class='list-disc list-inside mx-6'><li>Email processing company distributing our newsletters</li><li>Platforms for processing payments online</li><li>Our website language, plugins, and security providers</li></ul>",
            "When sharing information, we comply with all aspects of current data protection law. These parties are not allowed to use personally identifiable information except for the purpose of providing their services. All our data sharing relationships are governed by the contractors' privacy policies, which include strict data sharing and confidentiality protocols.",
            'We do not rent or sell your Personal information to anyone.',
            'We may also share information when required by law, for example, where ordered by the Court or to protect an individual from immediate harm.',
        ],
    },
    {
        id: 'how-is-my-information-secured',
        title: 'How is my Information secured?',
        content: [
            'We use appropriate technical, organizational, and administrative security measures to protect any information we hold in our records from loss, misuse, and unauthorized access, disclosure, alteration, and destruction.',
            'The security of your information is fully protected during transmission by using Secure Sockets Layer (SSL) software, which encrypts information you input. We transmit the entire credit card number to the appropriate credit card company during order processing.',
            'Unfortunately, no company or service can guarantee complete security. Unauthorized entry or use, hardware or software failure, and other factors may compromise the security of user information at any time. If you enter via your account, which is protected by a password for your privacy and security, you must prevent unauthorized access to your account and Personal Information by selecting and protecting your password appropriately and limiting access to your computer or device and browser by signing off after you have finished accessing your account.',
        ],
    },
    {
        id: 'which-information-can-i-access',
        title: 'Which Information Can I Access?',
        content: [
            'World Shipping Alliance gives you access to a broad range of information about your account and your interactions with for the limited purpose of viewing and, in certain cases, updating that information.',
        ],
    },
    {
        id: 'deletion-blocking-of-personal-data',
        title: 'Deletion / blocking of personal data',
        content: [
            'Our company only stores personal data for as long as is necessary for the purposes for which it was collected or in accordance with the legal retention periods. After the loss of a corresponding basis (contract, consent, legal regulation, etc.), we routinely delete or block this data.',
        ],
    },
    {
        id: 'what-about-cookies',
        title: 'What About Cookies?',
        content: [
            'To help you simply use our site, we sometimes place small files on your computer known as cookies. Almost all websites do this as well. Cookies have many uses and most are not damaging to your privacy. We do not use cookies that collect or transfer your personal data to other websites for advertising or any other purpose.',
            'Cookies are used on this site purely to improve services for you through, for example:',
            "<ul class='list-disc list-inside mx-6'><li>Enabling a service to recognize your device, so you don’t have to give the same information several times during one task</li><li>Recognizing that you may already have given a username and password, so you don’t need to do it for every web page requested</li><li>Measuring how many people are using the site, so it can be made easier to use and there’s enough capacity to ensure it is fast enough</li></ul>",
            'If you do not wish to accept any cookies on your machine, you can disable them by adjusting the settings on your browser. However, this is likely to adversely affect the functionality of websites you visit.',
        ],
    },
    {
        id: 'conditions-of-use',
        title: 'Conditions of Use, Notices, and Revisions',
        content: [
            'If you choose to visit wsa-network.com, your visit and any dispute over privacy is subject to this Notice and our Conditions of Use, including limitations on damages, resolution of disputes, and application of the law of the United States of America',
            'If you have any concern about privacy at WSA, please contact us with a thorough description, and we will try to resolve it.',
            'Our business changes constantly, and our Privacy Notice and the Conditions of Use will change also. We may e-mail periodic reminders of our notices and conditions, but you should check our Web site frequently to see recent changes. Unless stated otherwise, our current Privacy Notice applies to all information that we have about you and your account.',
            'We stand behind the promises we make, however, and will never materially change our policies and practices to make them less protective of customer information collected in the past without the consent of affected customers.',
        ],
    },
    {
        id: 'examples-of-information-collected',
        title: 'Examples of Information Collected',
        content: [
            '<b>Information You Give Us:</b> You provide most such information when you search, or communicate with customer service. For example, we provide information when you search for a member by the name or country an order through wsa-network.com, communicate with us by phone, e-mail, or otherwise; completing our entry application form, Contact us or Subscription.',
        ],
    },
]);
const heading = ref({
    title: 'World Shipping Alliance is pleased to welcome you to our website and thank you for your interest in our network.',
    description:
        'WSA understands that your privacy is important to you and that you care about how your personal data is used. We respect and value the privacy of everyone who visits our website, which will only collect and use personal data in ways to fill your order, and in a way that is consistent with our obligations and your rights under the law.',
});
</script>
<template>
    <div class="flex flex-col gap-5">
        <div>
            <div v-if="heading.title" class="font-medium text-lg" v-html="heading.title" />
            <p v-if="heading.description" class="mt-1" v-html="heading.description" />
        </div>
        <ol class="divide-y divide-dashed list-decimal">
            <li v-for="item in policies" :key="item.id" class="py-1.5">
                <NuxtLink :href="'#' + item.id" class="hover:text-primary">
                    <span v-html="item.title" />
                </NuxtLink>
            </li>
        </ol>
        <template v-for="item in policies" :key="item.id">
            <div :id="item.id" class="first:mt-0 mt-5 last:border-0 border-b border-dashed pb-5 last-pb-0">
                <div class="py-1 text-lg font-medium pl-6 !border-warning border-l-4" v-html="item.title" />
                <div class="mt-3" v-html="item.content" />
            </div>
        </template>
    </div>
</template>
