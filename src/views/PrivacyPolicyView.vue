<template>
    <v-container
        fluid
        class="min-height"
    >
        <v-row class="width">
            <v-col cols="auto">
                <GoBackButton />
            </v-col>
        </v-row>

        <v-row
            justify="center"
            class="width"
        >
            <v-col
                cols="12"
                md="8"
            >
                <h1 class="font-weight-bold mb-1 text-dark-blue text-h4">
                    {{ t('views.privacy.title') }}
                </h1>
                <p class="mb-8 text-caption text-content">
                    {{ t('views.privacy.lastUpdated', { date: lastUpdated }) }}
                </p>

                <section
                    v-for="clause in clauses"
                    :key="clause.heading"
                    class="mb-6"
                >
                    <h2 class="font-weight-bold mb-2 text-dark-blue text-h6">
                        {{ clause.heading }}
                    </h2>
                    <p
                        v-for="(paragraph, index) in clause.paragraphs"
                        :key="index"
                        class="mb-2 text-body-2 text-content"
                    >
                        {{ paragraph }}
                    </p>
                    <ul
                        v-if="clause.list"
                        class="privacy-list text-body-2 text-content"
                    >
                        <li
                            v-for="item in clause.list"
                            :key="item"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Privacy Policy View.
 * @description Static privacy policy explaining how user data is collected and used.
 */
import { useI18n } from 'vue-i18n';
import GoBackButton from '@/components/GoBackButton/GoBackButton.vue';

const { t } = useI18n();

const lastUpdated = '29 June 2026';

const clauses = [
    {
        heading: '1. Introduction',
        paragraphs: [
            'This privacy policy describes how Feedback App ("we", "us", "our") collects, uses, and shares '
                + 'information when you use the Service. By using the Service, you agree to the collection and '
                + 'use of information in accordance with this policy.'
        ]
    },
    {
        heading: '2. Information We Collect',
        list: [
            'Information you provide directly: your name, email address, profile picture, and any feedback, '
                + 'comments, replies, or votes you submit.',
            'Information from social sign-in: if you sign in with Google or Facebook, we receive basic profile '
                + 'information (name, email, profile picture) from that provider.',
            'Information collected automatically: IP address, browser and device characteristics, and usage '
                + 'data such as pages visited and actions taken within the Service.'
        ]
    },
    {
        heading: '3. How We Use Your Information',
        list: [
            'To create and maintain your account and authenticate your sign-ins.',
            'To operate the core functionality of the Service: displaying feedback, comments, votes, roadmaps, and changelogs.',
            'To communicate with you about your account or important changes to the Service.',
            'To monitor, maintain, and improve the performance and security of the Service.',
            'To detect, prevent, and address fraud, abuse, or technical issues.'
        ]
    },
    {
        heading: '4. Sharing Your Information',
        paragraphs: [
            'We do not sell your personal information. We may share information in the following situations:'
        ],
        list: [
            'With other users: your name, profile picture, and submitted content (feedback, comments, replies, '
                + 'votes) are visible to other users of the Service by design.',
            'With service providers: we share information with vendors who perform services on our behalf, '
                + 'such as Firebase/Google Cloud for hosting, authentication, and storage.',
            'For legal reasons: we may disclose information if required by law, regulation, or legal process, '
                + 'or to protect the rights, property, or safety of us, our users, or others.',
            'Business transfers: information may be transferred in connection with a merger, acquisition, or '
                + 'sale of assets, subject to this policy.'
        ]
    },
    {
        heading: '5. Cookies and Tracking Technologies',
        paragraphs: [
            'We use cookies and local storage to keep you signed in and to remember preferences such as '
                + 'language and theme. We do not currently respond to "Do Not Track" browser signals, as there '
                + 'is no industry-standard way to do so.'
        ]
    },
    {
        heading: '6. Social Media Logins',
        paragraphs: [
            'If you register or sign in using a social media account (such as Google or Facebook), we receive '
                + 'profile information you have made available through that provider. We use this information '
                + 'only for the purposes described in this policy.'
        ]
    },
    {
        heading: '7. Third-Party Websites',
        paragraphs: [
            'The Service may contain links to third-party websites. We are not responsible for the privacy '
                + 'practices or content of those third parties, and a link does not imply our endorsement of them.'
        ]
    },
    {
        heading: '8. International Data Transfers',
        paragraphs: [
            'Your information may be transferred to, stored, and processed in countries other than your own, '
                + 'including the United States, where our service providers operate. Where required, we rely '
                + 'on appropriate safeguards, such as Standard Contractual Clauses, for such transfers.'
        ]
    },
    {
        heading: '9. Data Retention',
        paragraphs: [
            'We retain your information for as long as your account is active or as needed to provide the '
                + 'Service. If you delete your account, we will delete or anonymize your information within a '
                + 'reasonable period, unless a longer retention period is required or permitted by law.'
        ]
    },
    {
        heading: '10. Data Security',
        paragraphs: [
            'We implement reasonable technical and organizational security measures designed to protect your '
                + 'information. However, no method of transmission over the internet or electronic storage is '
                + '100% secure, and we cannot guarantee absolute security.'
        ]
    },
    {
        heading: '11. Children’s Privacy',
        paragraphs: [
            'The Service is not directed to children, and we do not knowingly collect personal information '
                + 'from children. By using the Service, you represent that you meet the minimum age required to '
                + 'use it in your jurisdiction.'
        ]
    },
    {
        heading: '12. Your Privacy Choices',
        paragraphs: [
            'Depending on your location, you may have rights to access, correct, delete, or export your '
                + 'personal information, and to object to or restrict certain processing. See our GDPR notice '
                + 'for details if you are located in the European Economic Area or UK. You can also update or '
                + 'delete much of your account information directly from your account settings.'
        ]
    },
    {
        heading: '13. Changes to This Policy',
        paragraphs: [
            'We may update this privacy policy from time to time. The updated version will be indicated by an '
                + 'updated "last updated" date above. Continued use of the Service after changes become '
                + 'effective constitutes acceptance of the revised policy.'
        ]
    },
    {
        heading: '14. Contact Us',
        paragraphs: [
            'If you have questions or comments about this policy, please contact us through the support '
                + 'channels listed in the application.'
        ]
    }
];
</script>

<style scoped>
.width {
    width: 70vw;
    margin: 0 auto;
}

.min-height {
    min-height: calc(100vh - 64px);
}

.privacy-list {
    padding-left: 20px;
}

.privacy-list li {
    margin-bottom: 4px;
}
</style>
