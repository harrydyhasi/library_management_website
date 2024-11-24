const Category = require("../models/category");
const { parse } = require("fast-csv");
const fs = require("fs");
const iconv = require("iconv-lite");

const addCategory = async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "ID and Name are required" });
  }
  try {
    const existingCategory = await Category.findOne({
      $or: [{ id: id }, { name: name }],
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this ID or Name already exists" });
    }
    const newCategory = new Category({ id, name });
    await newCategory.save();
    return res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, id: newId } = req.body;

    const category = await Category.findOne({ id: id });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const existingCategory = await Category.findOne({
      $or: [{ id: newId }, { name: name }],
      _id: { $ne: category._id },
    });

    if (existingCategory) {
      return res
        .status(400)
        .json({
          message: "Another category with this ID or Name already exists",
        });
    }

    category.name = name || category.name;
    category.id = newId || category.id;

    const updatedCategory = await category.save();

    return res
      .status(200)
      .json({
        message: "Update category successfully",
        category: updatedCategory,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ id: id });
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", category: category });
    }
    await Category.deleteOne({ id: id });
    return res.status(200).json({ message: "Delete category successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res
      .status(200)
      .json({ message: "Get all category successfully", categories });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ id: id });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ message: "Get category successfully", category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const importCategories = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "CSV file is required" });
      }
  
      const categories = [];
      let encoding = 'latin1';

      fs.createReadStream(req.file.path)
        .pipe(iconv.decodeStream(encoding))
        .on('error', (err) => {
          console.error(`Error decoding with ${encoding}, trying utf-8:`, err);
          encoding = 'utf-8';
          fs.createReadStream(req.file.path)
            .pipe(iconv.decodeStream(encoding))
            .pipe(parse({ headers: true }))
            .on("data", (row) => categories.push(row))
            .on("end", async () => {processCategories(req, categories, res)});
        })
        .pipe(parse({ headers: true }))
        .on("data", (row) => categories.push(row))
        .on("end", async () => {processCategories(req, categories, res)});
    } catch (error) {
      console.error("Error importing categories:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

const processCategories = async (req, categories, res) => {
  try {
    const insertedCategories = [];
    for (const category of categories) {
      const existingCategory = await Category.findOne({ id: category.id });
      if (!existingCategory) {
        const newCategory = new Category({
          id: category.id,
          name: category.name,
        });
        const savedCategory = await newCategory.save();
        insertedCategories.push(savedCategory);
      }
    }
    fs.unlinkSync(req.file.path);
    res.status(200).json({
      message: "Categories imported successfully",
      data: insertedCategories,
    });
  } catch (error) {
    console.error("Error saving categories:", error);
    res.status(500).json({ message: "Error saving categories", error: error.message });
  }
}

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  importCategories,
};
