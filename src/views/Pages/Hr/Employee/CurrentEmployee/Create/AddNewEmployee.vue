<template>
    <div :class="themeBlock" class="flex-1 w-full pt-14 p-4 space-y-8 relative min-h-screen">
        <div class="mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <!-- Progress Steps with raw CSS -->
            <div class="progress-main">
                <div class="progress-container" :data-steps="steps.length">
                    <div v-for="(step, index) in steps" :key="index" class="progress-item"
                        v-on:click="currentDiv(index + 1)">
                        <div :class="{
                            'active-step': currentStep >= index + 1,
                            'inactive-step': currentStep < index + 1
                        }" class="step-number">
                            {{ index + 1 }}
                        </div>
                        <span :class="{
                            'active-text': currentStep >= index + 1,
                            'inactive-text': currentStep < index + 1
                        }" class="step-label">
                            {{ step }}
                        </span>
                    </div>
                </div>
            </div>

            <div v-show="currentStep === 1">
                <BasicInformation />
            </div>
            <div v-show="currentStep === 2">
                <FamilyInformation />
            </div>
            <div v-show="currentStep === 3">
                <GuardianInformation />
            </div>
            <div v-show="currentStep === 4">
                <JobInformation />
            </div>
            <div v-show="currentStep === 5">
                <ProbationaryInformation />
            </div>
            <div v-show="currentStep === 6">
                <ContactInformation />
            </div>
            <div v-show="currentStep === 7">
                <AddressInformation />
            </div>
            <div v-show="currentStep === 8">
                <EducationInformation />
            </div>
            <div v-show="currentStep === 9">
                <TrainingInformation />
            </div>
            <div v-show="currentStep === 10">
                <ProfessionalInformation />
            </div>
            <div v-show="currentStep === 11">
                <ExperienceInformation />
            </div>
            <div v-show="currentStep === 12">
                <ReferenceInformation />
            </div>
            <div v-show="currentStep === 13">
                <DocumentInformation />
            </div>
            <div v-show="currentStep === 14">
                <TerminationInformation />
            </div>

            <!-- Navigation Buttons -->
            <div style="margin-left: 50px; margin-right: 50px; margin-bottom: 50px;">
                <div class="flex mt-8 pt-6 border-t border-gray-200">
                    <button v-if="currentStep > 1" @click="prevStep" type="button"
                        class="px-6 py-3 bg-indigo-400 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 transition-all duration-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Previous
                    </button>
                    <div v-else class="w-24"></div> <!-- Spacer for alignment -->

                    <button v-if="currentStep < steps.length" @click="nextStep" type="button"
                        class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center ml-auto">
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import BasicInformation from '../Create/BasicInformation.vue';
import FamilyInformation from '../Create/FamilyInformation.vue';
import GuardianInformation from '../Create/GuardianInformation.vue';
import JobInformation from '../Create/JobInformation.vue';
import ProbationaryInformation from '../Create/ProbationaryInformation.vue';
import ContactInformation from '../Create/ContactInformation.vue';
import AddressInformation from '../Create/AddressInformation.vue';
import EducationInformation from '../Create/EducationInformation.vue';
import TrainingInformation from '../Create/TrainingInformation.vue';
import ProfessionalInformation from '../Create/ProfessionalInformation.vue';
import ExperienceInformation from '../Create/ExperienceInformation.vue';
import ReferenceInformation from '../Create/ReferenceInformation.vue';
import DocumentInformation from '../Create/DocumentInformation.vue';
import TerminationInformation from '../Create/TerminationInformation.vue';

const store = useStore();
const steps = ['Basic Info', 'Family Info', 'Guardian Info', 'Job Info', 'Probationary Info', 'Contact Info', 'Address Info', 'Education Info', 'Training Info', 'Professional Certification Info', 'Experience', 'Reference Person Info', 'Documents', 'Termination'];
const currentStep = ref(1);

const nextStep = () => {
    if (currentStep.value < steps.length) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const currentDiv = (ind) => {
    currentStep.value = ind;
}

const themeBlock = computed(() => store.state.theme === "dark"
    ? "bg-gray-700 text-gray-100"
    : "bg-gray-100 text-gray-800");

</script>


<style scoped>
/* Raw CSS for progress section */
.progress-main {
    background: linear-gradient(to right, #f5f3ff, #e9d5ff);
    padding: 1rem 1.5rem;
    width: 100%;
    transition: all 0.3s ease;
    position: relative;
}

.progress-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: relative;
}

.progress-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;
    flex: 1;
    max-width: 120px;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    position: relative;
    z-index: 2;
}

/* Connecting line between steps */
.progress-container::before {
    content: '';
    position: absolute;
    top: 32px;
    /* Half of step-number height */
    left: 40px;
    right: 30px;
    height: 3px;
    background: #e9d5ff;
    z-index: 1;
}

/* Active progress line */
.progress-container::after {
    content: '';
    position: absolute;
    top: 32px;
    left: 40px;
    width: 0;
    height: 4px;
    background: #7e22ce;
    z-index: 1;
    transition: width 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

/* Calculate the width of the active progress line based on current step */
.progress-container[data-steps="14"]::after {
    width: calc((100% / 14) * (var(--current-step) - 1));
}

.progress-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.progress-item:hover {
    transform: translateY(-5px) scale(1.05);
    background-color: #d8b4fe;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
}

.progress-item:hover::before {
    opacity: 1;
}

.progress-item:hover .step-number {
    transform: scale(1.1);
}

.progress-item:hover .step-label {
    color: #7e22ce;
    font-weight: 600;
}

.step-number {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    z-index: 2;
    background: white;
}

.active-step {
    background-color: #7e22ce;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(126, 34, 206, 0.3);
}

.inactive-step {
    background-color: #f3e8ff;
    color: #7e22ce;
}

.step-label {
    font-size: 0.875rem;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
}

.active-text {
    color: #7e22ce;
    font-weight: 600;
}

.inactive-text {
    color: #8b5cf6;
}

/* Responsive styles */
@media (max-width: 1024px) {
    .progress-main {
        overflow-x: auto;
        padding-bottom: 1rem;
        scrollbar-width: thin;
        scrollbar-color: #c4b5fd #f5f3ff;
    }

    .progress-container {
        width: max-content;
        min-width: 100%;
    }

    .progress-item {
        flex: 0 0 auto;
        margin-right: 1rem;
    }

    /* Hide progress line on mobile */
    .progress-container::before,
    .progress-container::after {
        display: none;
    }

    /* Scrollbar styling */
    .progress-main::-webkit-scrollbar {
        height: 6px;
    }

    .progress-main::-webkit-scrollbar-track {
        background: #f5f3ff;
        border-radius: 3px;
    }

    .progress-main::-webkit-scrollbar-thumb {
        background-color: #c4b5fd;
        border-radius: 3px;
    }
}
</style>
