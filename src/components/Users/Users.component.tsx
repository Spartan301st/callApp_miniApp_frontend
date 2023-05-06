import { useEffect, useState } from "react";
import useStore from "../../store.js"
import { Button, Modal, Table } from "antd";
import { AntDesTableData, User } from "../../types/types.js";
import AddModal from "../AddModal/AddModal.component.js";
import "./Users.style.scss"

import {DeleteOutlined} from "@ant-design/icons";
import EditModal from "../EditModal/EditModal.component.js";


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
  const [addNewModalVisible, setAddNewModalVisible] = useState(false);
  const [editNewModalVisible, setEditNewModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<{ record: AntDesTableData; rowIndex: number | undefined; } | null>(null);

  const openAddUserModal = () => setAddNewModalVisible(true);

  const onUserDelete = ({key, ...rest}: {key: number}) => {    
    removeData(key)
  }

  const handleRowClick = (record: AntDesTableData, rowIndex: number | undefined) => {    
    setSelectedRowData({record, rowIndex});
    setEditNewModalVisible(true);
  };
  
  return (
    <div className="usersDataContainer">
      <Table 
        className="usersDataContainer__usersDataTable"
        dataSource={antTableData} 
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => handleRowClick(record, rowIndex),
          };
        }}
        />
      <div className="usersDataContainer__userAddBtnContainer">
        <Button className="usersDataContainer__userAddBtn" type="primary" onClick={openAddUserModal}>Add User</Button>
      </div>

      {addNewModalVisible && <AddModal open={addNewModalVisible} onCancel={() => setAddNewModalVisible(false)}/>}
      {editNewModalVisible && <EditModal open={editNewModalVisible} onCancel={() => setEditNewModalVisible(false)} rowUserData={selectedRowData!}/>}
    </div>
  )
}

export default Users