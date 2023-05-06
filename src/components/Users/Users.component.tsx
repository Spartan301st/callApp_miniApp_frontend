import { useEffect, useState } from "react";
import useStore from "../../store.js"
import { Button, Table } from "antd";
import { User } from "../../types/types.js";
import AddModal from "../AddModal/AddModal.component.js";
import "./Users.style.scss"

import {DeleteOutlined} from "@ant-design/icons";


const Users = () => {
  const { data, fetchData, removeData } = useStore();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'delete',
      key: 'delete',
      render: (_: unknown, record: {key: number, address:string,email: string,gender: string,name: string,phone: string}) => {
        return (<>
          <DeleteOutlined className="deleteIcon" onClick={() => onUserDelete(record) }/>
        </>)
      }
    },
  ];
  
  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const antTableData = data.map((user:User) => {
    const {id, address, ...rest} = user;
    return { key: id, address: `${address.street}, ${address.city}`, ...rest };
  })
  const [modalVisible, setModalVisible] = useState(false);
  const openAddUserModal = () => setModalVisible(true);

  const onUserDelete = ({key, ...rest}: {key: number}) => {
    console.log("rest", rest);
    
    removeData(key)
  }
  
  return (
    <div className="usersDataContainer">
      <Table className="usersDataContainer__usersDataTable" dataSource={antTableData} columns={columns}/>
      <div className="usersDataContainer__userAddBtnContainer">
        <Button className="usersDataContainer__userAddBtn" type="primary" onClick={openAddUserModal}>Add User</Button>
      </div>

      <AddModal open={modalVisible} onCancel={() => setModalVisible(false)}/>
    </div>
  )
}

export default Users