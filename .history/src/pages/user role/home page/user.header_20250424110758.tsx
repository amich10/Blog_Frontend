import { Button, Layout } from 'antd';
import React from 'react'


export interface ICollapseProps {
    collapsed: boolean;
    setCollapsed: Function;
  }
const UserHeader = ({collapsed,setCollapsed}:ICollapseProps) => {

  return (
    <>
    <Layout.Header>
        <Button>
            
        </Button>
    </Layout.Header>
    </>
  )
}
export default UserHeader;
