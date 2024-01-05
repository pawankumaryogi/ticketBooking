import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { LuArmchair } from "react-icons/lu";

function App() {
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState([]);
  // console.log(seats)

  const [count, setCount] = useState(0);
  const [booked, setBooked] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = () => {
    axios
      .get(`http://localhost:8000/seats`)
      .then((res) => {
        setLoading(false);
        setSeats(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleBook = () => {
    if (count > 7 || count === 0) {
      toast({
        title: "You cannot book more than 7 seats at a time.",
        status: "error",
        position: "top",
        isClosable: true,
      });
      return;
    }

    axios
      .post(`http://localhost:8000/seats/reserve`, {
        No_of_Seats: Number(count),
      })
      .then((res) => {
        setBooked(res.data);
        toast({
          title: "Booking Successful",
          status: "success",
          position: "top",
          isClosable: true,
        });
        getSeats();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error.response.data.message,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  };
  const handleReset = () => {
    axios
      .patch(`http://localhost:8000/seats/reset`)
      .then((res) => {
        setBooked(res.data);
        toast({
          title: "Reset Successful",
          status: "info",
          position: "top",
          isClosable: true,
        });
        getSeats();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error.response.data.message,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  };

  if (loading) {
    return (
      <Flex
        h={"100vh"}
        w={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Heading>loading..</Heading>
      </Flex>
    );
  }
else
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "block",
        // flexDirection:"coulmn",
        padding: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    
      
       {/* Booking section */}

        {/* <div style={{ height: "400px", width: "500px" }}> */}
        <Flex
          w={{ base: "80%", md: "40%", lg: "100%" }}
          flexDir={"column"}
          align={"center"}
          // gap={"20px"}
          bgColor={"white"}
          padding={"10px 20px 10px 10px"}
          // height={"450px"}
          // width={"550px"}
          borderRadius={"10px"}
          boxShadow={"rgba(0, 0.1, 0, 0.2) 10px 15px 15px;"}
        >
          <Heading>Welcome to your Coach</Heading>
        </Flex>
        {/* </div> */}
     

      {/* Seat Layout */}
      
      <div style={{display:"flex", justifyContent:"center",paddingTop:"20px", alignItems:"center"}}>
      <h2 style={{ fontSize: "25px" }}>Enter seats for booking..</h2>
      <Flex width={'200px'} >
        <InputGroup>
          <InputLeftAddon>Seats :</InputLeftAddon>
          <Input
            type="number"
            placeholder="phone number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </InputGroup>
        </Flex>
      {booked.length > 0 ? (
        <Text>Your Booked Seats : {booked.join(", ")}</Text>
      ) : null}
      <Button
        onClick={handleBook}
        colorScheme="teal"
        height={"30px"}
        width={"70px"}
        fontSize={"20px"}
        marginLeft={"10px"}

        // marginTop={"30px"}
      >
        Book
      </Button>
      <Button
        onClick={handleReset}
        colorScheme="red"
        height={"30px"}
        width={"70px"}
        fontSize={"20px"}
        // marginTop={"30px"}
        marginLeft={"10px"}
        // marginBottom={"30px"}
      >
        Reset
      </Button>
</div>
      <div style={{ marginLeft: "150px", marginTop:"20px" }}>
        <Flex
          w={"95%"}
          justifyContent={"space-around"}
          alignItems={"center"}
          flexDir={{ base: "column", md: "row", lg: "row" }}
          h={{ base: "auto", md: "100vh", lg: "100%" }}
        >
          <Grid
            // w={{ base: "80%", md: "30%", lg: "30%" }}
            templateColumns={"repeat(7,1fr)"}
            bgColor={"white"}
            p={"40px"}
            borderRadius={"20px"}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
            // gridGap="1"
          >
            {seats.slice(0, 80).map((e) => (
              <Box key={e._id} align="center" height="38px" width="90px">
                <LuArmchair
                  color={e.isBooked ? "gray" : "green"}
                  fontSize={"40px"}
                  // Adjust the height of the chairs
                  // Adjust the width of the chairs
                />
                <Text fontSize={"11px"} mt={"-35px"}>
                  {e.seatNumber}
                </Text>
              </Box>
            ))}
          </Grid>
        </Flex>
      </div>
    </div>
  );
}

export default App;
