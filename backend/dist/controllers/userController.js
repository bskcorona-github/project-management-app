"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        const userExists = yield userModel_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const usernameExists = yield userModel_1.default.findOne({ username });
        if (usernameExists) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = new userModel_1.default({
            email,
            password: hashedPassword,
            username,
        });
        yield user.save();
        res.status(201).json({
            _id: user._id.toString(),
            email: user.email,
            username: user.username,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    catch (error) {
        console.error('Error saving user:', error);
        if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate field value entered', error: error.keyValue });
        }
        else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            res.json({
                _id: user._id.toString(),
                email: user.email,
                username: user.username,
                token: (0, generateToken_1.default)(user._id.toString()),
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id.toString(),
            email: user.email,
            username: user.username,
        });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
exports.getUserProfile = getUserProfile;
