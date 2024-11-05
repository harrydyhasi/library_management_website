const Category = require('../models/category');

const addCategory = async (req, res) => {
    const {id, name} = req.body;

    if (!id || !name) {
        return res.status(400).json({message: 'ID and Name are required'});
    }
    try {
        const existingCategory = await Category.findOne({ $or: [{ id: id }, { name: name }] });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this ID or Name already exists' });
        }
        const newCategory = new Category({id, name});
        await newCategory.save();
        return res.status(201).json({message: 'Category created successfully', category: newCategory});
    } catch (error) {
        return res.status(500).json({message: 'Server error', error: error.message});
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, id: newId } = req.body; 

        const category = await Category.findOne({ id: id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const existingCategory = await Category.findOne({ 
            $or: [{ id: newId }, { name: name }],
            _id: { $ne: category._id }  
        });

        if (existingCategory) {
            return res.status(400).json({ message: 'Another category with this ID or Name already exists' });
        }

        category.name = name || category.name; 
        category.id = newId || category.id;   

        const updatedCategory = await category.save();  

        return res.status(200).json({ message: 'Update category successfully', category: updatedCategory });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findOne({ id: id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found', category: category });

        }
        await Category.deleteOne({id: id});
        return res.status(200).json({ message: 'Delete category successfully'});

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ message: 'Get all category successfully', categories});
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findOne({ id: id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({ message: 'Get category successfully', category });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById
};
