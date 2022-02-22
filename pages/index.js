import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button  } from '@chakra-ui/react';
import Property from '../components/Property';
import Head from 'next/head';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Banner = ( { imageUrl, purpose,  title1, title2, desc1, desc2, linkname, buttonText  } ) =>(
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt='banner'/> 
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text  fontSize="3xl" fontWeight="bold">{title1} <br/> {title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.500" >{desc1} <br /> {desc2} </Text>
      <Button fontSize="xl" >
          <Link href={linkname}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <Box >
      <Banner 
          purpose="Rent a Home"
          title1= "Rental Homes for"
          title2= "Everyone"
          desc1= "Explore Apartments, Villas, Homes"
          desc2= "and more"
          buttonText = "Explore Renting"
          linkname = "/search?purpose=for-rent"
          imageUrl = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          />

          <Flex flexWrap="wrap">
              {/* Fetch the properties  from api and map over them... */}
              {propertiesForRent.map( (property) => <Property property={property} key={property.id} /> )}
          </Flex>

          <Banner 
          purpose="Buy a Home"
          title1= "Find, Buy and Own Homes"
          title2= "Dream Home"
          desc1= "Explore Apartments, Villas, Homes"
          desc2= "and more"
          buttonText = "Explore Buying"
          linkname = "/search?purpose=for-sale"
          imageUrl = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
          />
          <Flex flexWrap="wrap">
             {propertiesForSale.map( (property) =>  <Property property={property} key={property.id} /> )}
          </Flex>
    </Box>
  )
}

//next js allow to create a function to featch data
export async function getStaticProps(){
    const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`) // paramerters from Rapid API
    const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

    return{
      props: {
        propertiesForSale : propertyForSale?.hits,
        propertiesForRent : propertyForRent?.hits,
        
      }
    } 
}
