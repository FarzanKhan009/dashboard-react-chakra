// Chakra imports
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import Footer from "components/footer/FooterAuth";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
// Custom components
import { NavLink } from "react-router-dom";
// Assets
import { FaChevronLeft } from "react-icons/fa";
// import jwt_decode from "jwt-decode";


function AuthIllustration(props) {
  const { children, illustrationBackground } = props;

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')


  // const loginHandler = (e) => {
  //   // localStorage.setItem('email', JSON.stringify(email))
  //   // localStorage.setItem('password', JSON.stringify(password))
  //   const data = {
  //     email: email,
  //     password: password
  //   }
  //   setLoading(true)
  //   axios.post(`${process.env.REACT_APP_SERVER_PATH}/auth/login`, JSON.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((response) => {
  //     console.log(response.data, 'see token')
  //     localStorage.setItem('token', response.data.accessToken)
  //     // Add Token Action dispatch
  //     // props.addUserTokenToRedux(response.data.accessToken)
  //     let decodedData = jwt_decode(response.data.accessToken)
  //     localStorage.setItem('id', decodedData.user.id)
  //   }).catch(error => {
  //     // setError(true)
  //     // setLoading(false)
  //     // setErrorText(error.response.data.message)
  //     // setErrorText('Invalid credentials')
  //     console.log("Error whilte Fetching Login Api")
  //   })
  //   // navigate('/account')
  // }
  // Chakra color mode
  return (
    <Flex position='relative' h='max-content'>
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w='100%'
        maxW={{ md: "66%", lg: "1313px" }}
        mx='auto'
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent='start'
        direction='column'>
        <NavLink
          to='/admin'
          style={() => ({
            width: "fit-content",
            marginTop: "40px",
          })}>
          <Flex
            align='center'
            ps={{ base: "25px", lg: "0px" }}
            pt={{ lg: "0px", xl: "0px" }}
            w='fit-content'>
            <Icon
              as={FaChevronLeft}
              me='12px'
              h='13px'
              w='8px'
              color='secondaryGray.600'
            />
            <Text ms='0px' fontSize='sm' color='secondaryGray.600'>
              Back to Simmmple
            </Text>
          </Flex>
        </NavLink>
        {children}
        <Box
          display={{ base: "none", md: "block" }}
          h='100%'
          minH='100vh'
          w={{ lg: "50vw", "2xl": "44vw" }}
          position='absolute'
          right='0px'>
          <Flex
            bg={`url(${illustrationBackground})`}
            justify='center'
            align='end'
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}></Flex>
        </Box>
        <Footer />
      </Flex>
      <FixedPlugin />
    </Flex>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
