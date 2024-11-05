// EditUserModal.js
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Button,
} from "@chakra-ui/react";

function EditUserModal({ isOpen, onClose, editData, handleEditChange, handleStatusChange, handleEditSubmit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chỉnh sửa thông tin người dùng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Họ và tên</FormLabel>
            <Input
              name="fullName"
              value={editData.fullName}
              onChange={handleEditChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={editData.email}
              onChange={handleEditChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              name="phone"
              value={editData.phone}
              onChange={handleEditChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Phân quyền</FormLabel>
            <Select
              name="role"
              value={editData.role}
              onChange={handleEditChange}
              placeholder="Chọn vai trò"
            >
              <option value="student">Sinh viên</option>
              <option value="manager">Quản lý thư viện</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>
          <FormControl display="flex" alignItems="center" justifyContent="space-between" mt="4">
            <FormLabel htmlFor="status-switch" mb="0">
              Trạng thái tài khoản
            </FormLabel>
            <Switch
              id="status-switch"
              isChecked={editData.status.toLowerCase() === "active"}
              onChange={handleStatusChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditUserModal;
