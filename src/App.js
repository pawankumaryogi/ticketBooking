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
  Text,
  useToast,
} from "@chakra-ui/react";
import { LuArmchair } from "react-icons/lu";

function App() {
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState([]);

  const [count, setCount] = useState(0);
  const [booked, setBooked] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = () => {
    axios
      .get(`https://unstop-task-backend-pawankumaryogi.vercel.app/seats`)
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
      .post(`https://unstop-task-backend-pawankumaryogi.vercel.app/seats/reserve`, {
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

  return (
    <div
      style={{
        backgroundColor: "teal",
        display: "flex",
        padding: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
   <div>

      {/* Seat color indication */}

      <div style={{ height: "300px", width: "500px" }}>
        {" "}
        <Flex
          // w={{ base: "60%", md: "20%", lg: "20%" }}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          bgColor={"white"}
          p={"40px"}
          borderRadius={"50%"}
          marginLeft={"80px"}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
        >
          <div
            style={{
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "80%",
            
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <Flex alignItems={"center"} gap={"10px"}>
                <LuArmchair color="green" size={"60px"} />
                <Text fontSize={"20px"}>Available</Text>
              </Flex>
            </div>
            <div>
              <Flex alignItems={"center"} gap={"10px"}>
                <LuArmchair color="red" size={"60px"} />
                <Text fontSize={"20px"}>Reserved</Text>
              </Flex>
            </div>
          </div>
        </Flex>
      </div>
       {/* Booking section */}

      <div style={{ height: "400px", width: "500px"}}>
        <Flex
          // w={{ base: "80%", md: "40%", lg: "40%" }}
          flexDir={"column"}
          // justifyContent={"center"}
          align={"center"}
          gap={"20px"}
          bgColor={"white"}
          p={"10px"}
          padding={"80px 20px 10px 10px"}
          height={"450px"}
          width={"550px"}
          borderRadius={"50px"}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
        >
          <Heading>Welcome to your Coach</Heading>
          <h2 style={{fontSize:"30px"}}>Enter seats for booking..</h2>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text w={"30%"}>Seats : </Text>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </Flex>
          {booked.length > 0 ? (
            <Text>Your Booked Seats : {booked.join(", ")}</Text>
          ) : null}
          <Button onClick={handleBook} colorScheme="teal" height={"100px"} width={"150px"} fontSize={"30px"} marginTop={"30px"} borderRadius={"50%"}>
            Book
          </Button>
        </Flex>
      </div>
      
   </div>
    
      {/* Seat Layout */}

      <div style={{ marginLeft: "150px" }}>
        <Flex
          w={"95%"}
          justifyContent={"space-around"}
          alignItems={"center"}
          gap={"60px"}
          flexDir={{ base: "column", md: "row", lg: "row" }}
          h={{ base: "auto", md: "100vh", lg: "100vh" }}
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
              <Box key={e._id} align="center" height="60px" width="100px">
                <LuArmchair
                  color={e.isBooked ? "red" : "green"}
                  fontSize={"40px"}
                  // Adjust the height of the chairs
                  // Adjust the width of the chairs
                />
                <Text fontSize={"2vh"} mt={"-5px"}>
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
