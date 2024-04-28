import { Box, Text, Image, VStack, HStack, Button, IconButton, useColorMode, Flex, Spacer } from '@chakra-ui/react';
import { FaSun, FaMoon, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [stories, setStories] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search?query=LLM')
      .then(response => response.json())
      .then(data => setStories(data.hits))
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const addToFavorites = (story) => {
    setFavorites([...favorites, story]);
  };

  return (
    <Box bgImage="url('/images/landing-page-background.jpg')" minH="100vh" p={5}>
      <Flex>
        <Text fontSize="2xl" fontWeight="bold" color="white">HackerNews LLM Stories</Text>
        <Spacer />
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          isRound={true}
          size="lg"
          alignSelf="flex-end"
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Flex>
      <VStack spacing={4} align="stretch" mt={10}>
        {stories.map((story, index) => (
          <HStack key={index} p={4} bg="whiteAlpha.800" borderRadius="lg" shadow="md">
            <VStack align="stretch">
              <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
              <Text fontSize="sm">{story.author}</Text>
            </VStack>
            <Spacer />
            <IconButton
              icon={<FaHeart />}
              colorScheme="pink"
              variant="outline"
              onClick={() => addToFavorites(story)}
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;