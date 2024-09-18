import { Box, Heading, IconButton, HStack, Button, Image, Text, useColorModeValue, useToast, useDisclosure, VStack, Input } from '@chakra-ui/react'
import {EditIcon, DeleteIcon} from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useProductStore } from '../store/products'
import { useState } from 'react'


const ProductCard = ({product}) => {
    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const handleUpdateProduct = async (pid, updatedProduct)=>{
      const {success, message} = await updateProduct(pid, updatedProduct);
      onClose();
      if(success){
        toast({
          title: 'Success',
          status: 'success',
          description : 'Product updated successfully',
          duration: 3000,
          isClosable: true,
        })
      }else{
          toast({
            title: 'Error',
            description : `Couldn't update product`,
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
      }
    }


    const handleDelete = async (pid)=>{
        const {success, message} = await deleteProduct(pid);
        if(success){
            toast({
              title: 'Success',
              status: 'success',
              description : message,
              duration: 3000,
              isClosable: true,
            })
          }else{
              toast({
                title: 'Error',
                description : message,
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
          }
    }

    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800')
    
  return (
    <Box
    shadow={'lg'}
    rounded={'lg'}
    overflow={'hidden'}
    transition={'all .3s'}
    bg={bg}
    _hover={{transform : 'translateY(-5px)', shadow:'xl'}}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='md' mb='2' >
                {product.name}
            </Heading>
            <Text color={textColor} fontSize={'xl'} fontWeight={'bold'} mb={'5'}>
                ${product.price}
            </Text>
            <HStack>
                <IconButton icon={<EditIcon onClick={onOpen}/>} colorScheme='blue' />
                <IconButton icon={<DeleteIcon />} onClick={()=>handleDelete(product._id)} colorScheme='red'/>
            </HStack>
            
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <Input
                      name = 'name'
                      placeholder = 'Product Name'
                      value={updatedProduct.name}
                      onChange={(e)=>setUpdatedProduct({...updatedProduct, name:e.target.value})}
                    />
                    <Input
                    placeholder="Price"
                      name = 'price'
                      type="number"
                      value={updatedProduct.price}
                      onChange={(e)=>setUpdatedProduct({...updatedProduct, price:e.target.value})}
                    />
                    <Input
                      placeholder="image URL"
                      name = 'image'
                      value={updatedProduct.image}
                      onChange={(e)=>setUpdatedProduct({...updatedProduct, image:e.target.value})}
                    />
                  </VStack>
                </ModalBody>
                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={()=>handleUpdateProduct(product._id, updatedProduct)}>
                  Update
                </Button>
                <Button variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    

        </Box>

    </Box>
  )
}

export default ProductCard
