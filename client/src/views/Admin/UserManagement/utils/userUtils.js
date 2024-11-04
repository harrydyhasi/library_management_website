// userUtils.js
import { createUser } from '@/redux/actions/user_action.js'; 
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export const useUserLogic = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleInputChange = (newUserData, setNewUserData) => (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateUser = async (newUserData, onClose, setNewUserData) => {
    if (!newUserData.email || !newUserData.password || !newUserData.role) {
      toast({
        title: "Thông tin không được để trống.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
      return;
    }

    try {
      await dispatch(createUser(newUserData));
      toast({
        title: "Thêm người dùng mới thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
      onClose(); 
      setNewUserData({ fullName: '', email: '', password: '', phone: '', role: '' }); 
    } catch (error) {
      toast({
        title: "Đã xảy ra lỗi: " + error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  };

  const filterData = (data, searchQuery) => {
    return data.filter(user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return { handleInputChange, handleCreateUser, filterData };
};
