import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import People from "../../components/People/People";
import Following from "../../components/Following/Following";
import Followers from "../../components/Followers/Followers";




export default function Community() {
    const [user, setUser] = useState([])
    
    const [people, setPeople] = useState("following")
    return (
        <>
            <div >
                <div style={{ width: "55vw", paddingTop: 25, display: "flex", justifyContent: "center", gap: 10 }}>
                    <Button onClick={() => {
                        setPeople("followers")
                    }} variant="contained" >Followers</Button>
                    <Button onClick={() => {
                        setPeople("following")
                    }} variant="contained">Following</Button>
                    <Button onClick={() => {
                        setPeople("people")
                    }} variant="contained">People You May Know</Button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }} >
                    {people==="people" && <People/>}
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {people==="following" && <Following/>}
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {people==="followers" && <Followers/>}
                </div>
            </div>
            {/* <Box flex={4} >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="one" onClick={() => setPeople(1)} label="Followers" />
                    <Tab value="two" onClick={() => setPeople(2)} label="Following" />
                    <Tab value="three" onClick={() => setPeople(3)} label="People You May Know" />
                </Tabs>

                {people === 1 ? <div>
                      <div>
                   
             user.followers.map((user)=>(
              return <UserCard data={user} />
                
            ))
       
                    </div> 
                </div> : null}





                {people === 2 ? <h1>TWO</h1> : null}
                {people === 3 ? <h1>THREE</h1> : null}

            </Box> */}
        </>
    )
}
