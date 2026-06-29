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
                    {{ t('views.terms.title') }}
                </h1>
                <p class="mb-8 text-caption text-content">
                    {{ t('views.terms.lastUpdated', { date: lastUpdated }) }}
                </p>

                <section
                    v-for="clause in clauses"
                    :key="clause.heading"
                    class="mb-6"
                >
                    <h2 class="font-weight-bold mb-2 text-dark-blue text-h6">
                        {{ clause.heading }}
                    </h2>
                    <p class="text-body-2 text-content">
                        {{ clause.body }}
                    </p>
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Terms of Use View.
 * @description Static terms of use / terms of service page.
 */
import { useI18n } from 'vue-i18n';
import GoBackButton from '@/components/GoBackButton/GoBackButton.vue';

const { t } = useI18n();

const lastUpdated = '29 June 2026';

const clauses = [
    {
        body: 'By accessing or using Feedback App ("the Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service.',
        heading: '1. Acceptance of Terms'
    },
    {
        body: 'Feedback App provides a platform for collecting user feedback, managing product roadmaps, and publishing changelogs. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.',
        heading: '2. Description of Service'
    },
    {
        body: 'You may be required to create an account to use certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.',
        heading: '3. User Accounts'
    },
    {
        body: 'You retain ownership of any feedback, comments, or other content you submit. By submitting content, you grant us a worldwide, royalty-free license to use, display, and distribute that content in connection with operating the Service.',
        heading: '4. User Content'
    },
    {
        body: 'You agree not to misuse the Service, including but not limited to: submitting unlawful, abusive, or fraudulent content; attempting to gain unauthorized access to the Service; or interfering with the normal operation of the Service.',
        heading: '5. Acceptable Use'
    },
    {
        body: 'The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.',
        heading: '6. Disclaimer of Warranties'
    },
    {
        body: 'To the maximum extent permitted by law, Feedback App shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the Service.',
        heading: '7. Limitation of Liability'
    },
    {
        body: 'We may suspend or terminate your access to the Service at any time, with or without cause or notice, including for conduct that violates these Terms of Use.',
        heading: '8. Termination'
    },
    {
        body: 'We may update these Terms of Use from time to time. Continued use of the Service after changes become effective constitutes acceptance of the revised terms.',
        heading: '9. Changes to These Terms'
    },
    {
        body: 'If you have any questions about these Terms of Use, please contact us through the support channels listed in the application.',
        heading: '10. Contact Us'
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
</style>
