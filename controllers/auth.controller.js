import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const authController = {
    // Register
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Name, email, and password are required", success: false });
            }

            const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists", success: false });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new UserModel({
                name: name.trim(),
                email: email.toLowerCase(),
                password: hashedPassword
            });

            await newUser.save();

            const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

            return res.status(201).json({
                success: true,
                token,
                user: { id: newUser._id, name: newUser.name, email: newUser.email, tasks: [] }
            });

        } catch (error) {
            console.error("Error in register:", error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    },

    // Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required", success: false });
            }

            const user = await UserModel.findOne({ email: email.toLowerCase() }).select("+password");
            if (!user) {
                return res.status(404).json({ message: "User not found", success: false });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials", success: false });
            }

            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

            return res.status(200).json({
                success: true,
                token,
                user: { id: user._id, name: user.name, email: user.email, tasks: user.tasks }
            });

        } catch (error) {
            console.error("Error in login:", error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    },

    // Get profile + tasks
    getProfile: async (req, res) => {
        try {
            const { userId } = req.user;
            const user = await UserModel.findById(userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found", success: false });
            }
            return res.status(200).json({ success: true, user });
        } catch (error) {
            console.error("Error in getProfile:", error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    },

    // Create a task
    createTask: async (req, res) => {
        try {
            const { userId } = req.user;
            const { title, description } = req.body;

            if (!title || !description) {
                return res.status(400).json({ message: "Title and description are required", success: false });
            }

            const user = await UserModel.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found", success: false });

            const newTask = { title, description };
            user.tasks.push(newTask);
            await user.save();

            return res.status(201).json({ success: true, task: newTask });
        } catch (error) {
            console.error("Error in createTask:", error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    },

    // Update a task
    updateTask: async (req, res) => {
        try {
            const { userId } = req.user;
            const { taskId } = req.params;
            const { title, description, completed } = req.body;

            const user = await UserModel.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found", success: false });

            // Find task index
            const index = user.tasks.findIndex(t => t._id.toString() === taskId);
            if (index === -1) return res.status(404).json({ message: "Task not found", success: false });

            // Update fields
            if (title !== undefined) user.tasks[index].title = title;
            if (description !== undefined) user.tasks[index].description = description;
            if (completed !== undefined) user.tasks[index].completed = completed;

            await user.save();
            return res.status(200).json({ success: true, task: user.tasks[index] });
        } catch (error) {
            console.error("Error in updateTask:", error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    },

    // Delete a task
    deleteTask: async (req, res) => {
        try {
            const { userId } = req.user;
            const { taskId } = req.params;
            console.log("Deleting task:", taskId);

            const user = await UserModel.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found", success: false });

            const index = user.tasks.findIndex(t => t._id.toString() === taskId);
            if (index === -1) return res.status(404).json({ message: "Task not found", success: false });

            user.tasks.splice(index, 1); // remove the task
            await user.save();
            return res.status(200).json({ success: true, message: "Task deleted" });
        } catch (error) {
            console.error("Error in deleteTask:", error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    }
};

export default authController;
