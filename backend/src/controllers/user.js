const User = require('../models/userModel');

const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId) return res.status(404).send({success : false, error: "token not found" })
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).send({success : false, data : updatedUser});
    } catch (error) {
        res.status(500).send({ message: 'Error updating user', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId) return res.status(404).send({success : false, error: "token not found" })
        await User.findByIdAndDelete(userId);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error });
    }
};

const getUserData = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId) return res.status(404).send({success : false, error: "token not found" })

        const user = await User.findById(userId);
        if (!user)return res.status(400).send({success:false, error : 'user not found'})
        res.status(200).send({success : true, data : user});
    } catch (error) {
        res.status(500).send({ message: 'Error fetching user data', error });
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getUserData
};