<template>
    <v-container fluid class="bg-background">
        <v-row class="row mx-auto">
            <v-col>
                <v-card class="bg-black">
                    <v-container>
                        <v-row>
                            <v-col class="d-flex flex column">
                                <v-btn 
                                    class="bg-btn-black"
                                    variant="tonal"
                                    density="default"
                                    size="small"
                                >
                                    Go Back
                                </v-btn>
                                Roadmap
                            </v-col>
                            <v-col>
                                <v-btn 
                                    class="bg-btn-pink"
                                    variant="tonal"
                                    density="default"
                                    size="small"
                                >
                                    + add feedback
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="row mx-auto">
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="text-body-1 pb-0">Planned (2)</v-card-title>
                    <v-card-subtitle class="text-caption">Lorem</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="text-body-1 pb-0">In-Progress (3)</v-card-title>
                    <v-card-subtitle class="text-caption">Lorem</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="text-body-1 pb-0">Live (1)</v-card-title>
                    <v-card-subtitle class="text-caption">Lorem</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="row mx-auto">
            <v-col>
                <v-card class="bg-white">
                    <v-card-text>LOL</v-card-text>
                    <v-card-title class="text-body-1 pb-0">Completed (1)</v-card-title>
                    <v-card-subtitle class="text-caption">Lorem</v-card-subtitle>
                    <v-card-text>LOL asd  sd dsadasdad sadasasdasd asdasdas asdas</v-card-text>
                    <v-card-text>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Feature
                        </v-btn>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Upvote
                        </v-btn>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Comment
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="bg-white">
                    <v-card-title class="text-body-1 pb-0">Archived (1)</v-card-title>
                    <v-card-subtitle class="text-caption">Lorem</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="bg-white">
                    <v-card-title class="text-body-1 pb-0">Archived (1)</v-card-title>
                    <v-card-subtitle class="text-caption">Lorem</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.row {
    min-height: 113px;
    width: 60%;
}
</style>