import { Modal, Form, Input, Select, Button } from 'antd';
import { AntDesTableData, UserFormValues } from '../../types/types';
import useStore from "../../store.js"
const { Option } = Select;

const EditModal = ({ open, onCancel, rowUserData }: { open: boolean; onCancel: () => void, rowUserData: { record: AntDesTableData; rowIndex: number | undefined; } }) => {
  
  const {updateData} = useStore();
  const fieldValues = (values: UserFormValues) => {    
    updateData(values, rowUserData.rowIndex! + 1 );
  }
  const [street, city] = rowUserData.record.address.split(",")
  const backToFormInputs = {
    name: rowUserData.record.name,
    email: rowUserData.record.email,
    gender: rowUserData.record.gender,
    street: street,
    city: city,
    phone: rowUserData.record.phone,
  }
  return (
    <Modal
      title="Edit Item"
      open={open}
      onCancel={onCancel}
      okButtonProps={{ disabled: true }}
      okText="Submit"
      footer={null}
    >
      <Form onFinish={(values) => fieldValues(values)} onFinishFailed={(err) => console.error("Error", err)} autoComplete='off' labelCol={{span:6}} wrapperCol={{span: 16}} initialValues={backToFormInputs}>
      
        {/* name */}
        <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: 'Please enter your username!' }, {whitespace: true}]}
        hasFeedback
        >
        <Input />
        </Form.Item>
        {/* email */}
        <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email!'}, {type: "email", message: "Please type a valid email!" }, {whitespace: true}]}
        hasFeedback
        >
        <Input />
        </Form.Item>
        {/* gender */}
        <Form.Item name="gender" label="Gender" rules={[{ required: true }, {whitespace: true}]}
        hasFeedback>
        <Select
          placeholder="Select your gender!"
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
        </Select>
      </Form.Item>
      <div>
        {/* street */}
        <Form.Item
        label="Street"
        name="street"
        rules={[{ required: true, message: 'Please input your street!' }, {whitespace: true}]}
        hasFeedback
        >
        <Input />
        </Form.Item>
        {/* city */}
        <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: 'Please input your city!' }, {whitespace: true}]}
        hasFeedback
        >
        <Input />
        </Form.Item>
      </div>
      {/* city */}
      {/* TODO: ADD REGEX FOR A PHONE NUMBER */}
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }, {whitespace: true}]}
        hasFeedback
        >
        <Input />
      </Form.Item>
      <Button block type='primary' htmlType='submit'>Submit</Button>

      </Form>
    </Modal>
  )
}

export default EditModal