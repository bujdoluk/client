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
                    {{ t('views.gdpr.title') }}
                </h1>
                <p class="mb-8 text-caption text-content">
                    {{ t('views.gdpr.lastUpdated', { date: lastUpdated }) }}
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
                        class="gdpr-list text-body-2 text-content"
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
 * @file GDPR View.
 * @description Static GDPR / data protection information page.
 */
import { useI18n } from 'vue-i18n';
import GoBackButton from '@/components/GoBackButton/GoBackButton.vue';

const { t } = useI18n();

const lastUpdated = '29 June 2026';

const clauses = [
    {
        heading: '1. Introduction and Scope',
        paragraphs: [
            'This notice explains how Feedback App ("we", "us", "our") collects, uses, shares, and protects '
                + 'personal data in connection with the Service, and the rights available to you under the General '
                + 'Data Protection Regulation (EU) 2016/679 ("GDPR") and equivalent UK data protection law.',
            'This notice applies to all users of the Service, regardless of where you access it from, whenever '
                + 'your personal data is processed in connection with operating the Service.'
        ]
    },
    {
        heading: '2. Data Controller',
        paragraphs: [
            'For the purposes of GDPR, Feedback App is the data controller responsible for your personal data. '
                + 'You can contact us regarding any data protection matter through the support channels listed '
                + 'in the application.'
        ]
    },
    {
        heading: '3. Categories of Personal Data We Collect',
        list: [
            'Account data: name, email address, profile picture, and authentication identifiers (including data '
                + 'provided via Google, Facebook, or anonymous sign-in).',
            'Content data: feedback, comments, replies, votes, and any other content you submit through the Service.',
            'Usage data: pages visited, features used, timestamps, and interactions with the Service, collected '
                + 'via Firebase Performance Monitoring and similar tools.',
            'Technical data: IP address, browser type, device information, and similar data collected '
                + 'automatically when you use the Service.'
        ]
    },
    {
        heading: '4. Sources of Personal Data',
        paragraphs: [
            'We collect personal data directly from you when you create an account, sign in, or submit content. '
                + 'We also receive limited profile information from third-party sign-in providers (Google, '
                + 'Facebook) when you choose to authenticate through them, and we collect technical and usage '
                + 'data automatically through your use of the Service.'
        ]
    },
    {
        heading: '5. Purposes and Legal Basis for Processing',
        list: [
            'To create and manage your account, and to provide the core functionality of the Service — '
                + 'necessary for the performance of a contract with you.',
            'To display your feedback, comments, and votes to other users as intended by the Service — '
                + 'necessary for the performance of a contract with you.',
            'To maintain the security, stability, and performance of the Service — based on our legitimate interest.',
            'To communicate with you about your account or changes to the Service — based on our legitimate '
                + 'interest or your consent, where required.',
            'To comply with legal obligations, such as responding to lawful requests by public authorities — '
                + 'necessary for compliance with a legal obligation.'
        ],
        paragraphs: ['We process your personal data for the following purposes and legal bases:']
    },
    {
        heading: '6. Cookies and Similar Technologies',
        paragraphs: [
            'The Service uses essential cookies and local storage to keep you signed in, remember your language '
                + 'and theme preferences, and maintain basic functionality. We do not use cookies for '
                + 'third-party advertising.'
        ]
    },
    {
        heading: '7. Third-Party Processors and Sub-processors',
        paragraphs: [
            'We use Firebase and other Google Cloud services to host the Service, authenticate users, store '
                + 'files, and operate our database. These providers act as processors on our behalf and process '
                + 'personal data only as instructed by us, under their own data processing agreements and '
                + 'security commitments.'
        ]
    },
    {
        heading: '8. International Data Transfers',
        paragraphs: [
            'Our processors may store and process personal data in countries outside the European Economic '
                + 'Area, including the United States. Where this occurs, we rely on appropriate safeguards '
                + 'recognized under GDPR, such as Standard Contractual Clauses, to ensure your data remains protected.'
        ]
    },
    {
        heading: '9. Data Retention',
        paragraphs: [
            'We retain your personal data for as long as your account remains active and as necessary to '
                + 'provide the Service. If you delete your account, we will delete or anonymize your personal '
                + 'data within a reasonable period, except where we are required to retain it for longer to '
                + 'comply with a legal obligation, resolve disputes, or enforce our agreements.'
        ]
    },
    {
        heading: '10. Data Security',
        paragraphs: [
            'We implement appropriate technical and organizational measures designed to protect your personal '
                + 'data against unauthorized access, alteration, disclosure, or destruction, including access '
                + 'controls and encryption in transit. No method of transmission or storage is completely '
                + 'secure, and we cannot guarantee absolute security.'
        ]
    },
    {
        heading: '11. Your Rights Under GDPR',
        list: [
            'Access the personal data we hold about you and receive a copy of it.',
            'Request rectification of inaccurate or incomplete personal data.',
            'Request erasure of your personal data ("right to be forgotten").',
            'Request restriction of how we process your personal data.',
            'Receive your personal data in a portable format, or have it transferred to another service '
                + '("data portability").',
            'Object to our processing of your personal data, including processing based on legitimate interest.',
            'Withdraw consent at any time, where processing is based on consent, without affecting prior '
                + 'lawful processing.',
            'Lodge a complaint with your local data protection supervisory authority.'
        ],
        paragraphs: ['Subject to applicable conditions and exceptions under GDPR, you have the right to:']
    },
    {
        heading: '12. How to Exercise Your Rights',
        paragraphs: [
            'To exercise any of the rights above, contact us through the support channels listed in the '
                + 'application. We may need to verify your identity before responding, and we will respond to '
                + 'legitimate requests within the timeframes required by GDPR.'
        ]
    },
    {
        heading: '13. Automated Decision-Making',
        paragraphs: [
            'We do not use your personal data for automated decision-making or profiling that produces legal '
                + 'effects or otherwise significantly affects you.'
        ]
    },
    {
        heading: '14. Children’s Privacy',
        paragraphs: [
            'The Service is not directed to children, and we do not knowingly collect personal data from '
                + 'children. If you believe a child has provided us with personal data, please contact us so we '
                + 'can take appropriate action.'
        ]
    },
    {
        heading: '15. Changes to This Notice',
        paragraphs: [
            'We may update this GDPR notice from time to time to reflect changes in our practices or legal '
                + 'requirements. Material changes will be reflected by updating the "last updated" date above. '
                + 'Continued use of the Service after changes become effective constitutes acknowledgement of '
                + 'the revised notice.'
        ]
    },
    {
        heading: '16. Contact Us',
        paragraphs: [
            'If you have any questions about this notice, how we handle your personal data, or wish to '
                + 'exercise your rights, please contact us through the support channels listed in the application.'
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

.gdpr-list {
    padding-left: 20px;
}

.gdpr-list li {
    margin-bottom: 4px;
}
</style>
