import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import Slider from "./StepperSlider";

const Stepper = ({ steps }) => {
    const [currentStep, setStep] = React.useState(steps[0]);
    const ContentComponent = currentStep.component;

    const getCurrentStepIndex = () =>
        steps.findIndex((s) => s.label === currentStep.label);

    const handleNext = () => {
        const currentIndex = getCurrentStepIndex();
        const nextStep = steps[currentIndex + 1];
        setStep(nextStep);
    };

    const handlePrev = () => {
        const currentIndex = getCurrentStepIndex();
        const prevStep = steps[currentIndex - 1];
        setStep(prevStep);
    };

    const shouldShowPrevButton = () => {
        const currentIndex = getCurrentStepIndex();
        return currentIndex !== 0;
    };

    return (
        <Flex w="100%" h="100%" direction="column" p="50px">
            <Flex flex={5}>
                <ContentComponent />
            </Flex>
            <Slider steps={steps} currentStep={currentStep} />
            <Flex flex={1} justify="center" align="center">
                <Button
                    size="md"
                    display={shouldShowPrevButton() ? "inline-block" : "none"}
                    variant="outline"
                    colorScheme="cyan"
                    onClick={handlePrev}
                >
                    Previous
                </Button>
                <Button
                    isDisabled
                    size="md"
                    variant="solid"
                    colorScheme="green"
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Flex>
        </Flex>
    );
};

export default Stepper;
