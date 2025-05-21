import { Layout } from "antd"
import { useState } from "react"
import UserHeader from "./user.header"
import { Outlet } from "react-router"


const UserHomePage = () => {
  return (
    <Layout>
        <Layout>
            <UserHeader/>
           <Outlet/>
        </Layout>
    </Layout>    
  )
}

export default UserHomePage