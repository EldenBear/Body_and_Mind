import * as React from "react";
import { 
    Box,
    Card, 
    CardHeader, 
    CardBody,
    Heading,
    Stack,
    StackDivider,
    Text,
} from '@chakra-ui/react';




const Workout = (props) => {
    return (
        <Card maxW="2xl" className="workoutInfo">
        <CardHeader>
          <Heading size='md'>{props.name}</Heading>
        </CardHeader>
      
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Type
              </Heading>
              <Text pt='2' fontSize='sm'>
                {props.type}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Muscle
              </Heading>
              <Text pt='2' fontSize='sm'>
                {props.muscle}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Equipment
              </Heading>
              <Text pt='2' fontSize='sm'>
                {props.equipment}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Difficulty
              </Heading>
              <Text pt='2' fontSize='sm'>
                {props.difficulty}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Instructions
              </Heading>
              <Text pt='2' fontSize='sm'>
                {props.instructions}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    )
};

export default Workout;