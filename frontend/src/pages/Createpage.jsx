import { Box, Container, VStack, Heading, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/products"


const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name : "",
    price : "",
    image : ""
  })

  const toast = useToast();
  const {createProduct} = useProductStore();

  const handleAddProduct = async ()=>{
    const {success, message} = await createProduct(newProduct);
    if(success){
      toast({
        title: 'Product added.',
        status: 'success',
        description : message,
        duration: 3000,
        isClosable: true,
      })
    }else{
        toast({
          title: 'Error in adding product.',
          description : message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
    }
    
    setNewProduct({ name: "", price: "", image: "" });
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product

        </Heading>

      <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={8} rounded={"lg"} shadow={"md"}>
        <VStack spacing={4}>

        <Input
          name = 'name'
          placeholder = 'Product Name'
          value = {newProduct.name}
          onChange={(e)=>setNewProduct({...newProduct, name : e.target.value})}
        />
        <Input
        placeholder="Price"
          name = 'price'
          type="number"
          value = {newProduct.price}
          onChange={(e)=>setNewProduct({...newProduct, price : e.target.value})}
        />
        <Input
          placeholder="image URL"
          name = 'image'
          value = {newProduct.image}
          onChange={(e)=>setNewProduct({...newProduct, image : e.target.value})}
        />
        
        <Button colorScheme={'blue'} w={"full"} onClick={handleAddProduct}>Add Product</Button>
        </VStack>
      </Box>
      </VStack>
    </Container>
  )
}

export default Createpage
