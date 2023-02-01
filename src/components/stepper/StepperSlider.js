import { Flex, Box, Text } from "@chakra-ui/react";
import { Step } from "./Stepper";


const StepperSlider = ({ steps, currentStep }) => {
    const renderStepBoxes = () => {
        return steps.map((step, idx) => {
            return (
                <Box key={step.label} flex={1} position="relative">
                    <Flex direction="column" align="center">
                        <Box
                            w="15px"
                            h="15px"
                            bg={currentStep.label === step.label ? "blue" : "gray"}
                            borderRadius="50%"
                        />
                        <Text fontSize={["12px", "12px", "14px", "14px"]}>
                            {step.label}
                        </Text>
                    </Flex>
                    {idx > 0 && (
                        <Box
                            position="absolute"
                            flex="1 1 auto"
                            style={{
                                top: "10px",
                                left: "calc(-50% + 20px)",
                                right: "calc(50% + 20px)"
                            }}
                        >
                            <span
                                style={{
                                    borderTopStyle: "solid",
                                    borderTopWidth: "1px",
                                    borderColor: "gray",
                                    display: "block"
                                }}
                            />
                        </Box>
                    )}
                </Box>
            );
        });
    };

    return (
        <Flex h="50px" w="100%" justify="space-between" position="relative">
            {renderStepBoxes()}
        </Flex>
    );
};

export default StepperSlider;
