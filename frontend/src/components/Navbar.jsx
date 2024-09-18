import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {CiSquarePlus} from 'react-icons/ci'
import {IoMoon} from 'react-icons/io5'
import {LuSun} from 'react-icons/lu'

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode()
  return (
    <Container
    maxW={'1140'}
    px={'4'}
    
    >
      <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
        base:"column",
        sm:"row"
      }}
      >
      <Text

      bgGradient={'linear(to-r, #3a7bd5, #3a6073)'}
      bgClip={'text'}
      textAlign={"center"}
      textTransform={"uppercase"}
      fontSize= {{base : 22, sm : 28}}
      fontWeight='bold'
      >
        <Link to={'/'}>Product Store 🛒</Link>
      </Text>
      <HStack spacing={2} alignItems={"center"}>
        <Link to={'/create'}>
        <Button>
          <CiSquarePlus fontSize={'24'}/>
        </Button>
        </Link>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <IoMoon /> : <LuSun size={'24'}/>}
        </Button>

      </HStack>

      </Flex>
    </Container>
  )
}

export default Navbar
