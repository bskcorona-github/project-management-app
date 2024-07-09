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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const projectModel_1 = __importDefault(require("../models/projectModel"));
// プロジェクトの取得
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projectModel_1.default.find({ members: req.user._id });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getProjects = getProjects;
// プロジェクトの作成
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const project = new projectModel_1.default({
        name,
        description,
        owner: req.user._id,
        members: [req.user._id],
    });
    try {
        const createdProject = yield project.save();
        res.status(201).json(createdProject);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createProject = createProject;
// プロジェクトの編集
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const project = yield projectModel_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (!project.members.includes(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        project.name = name;
        project.description = description;
        const updatedProject = yield project.save();
        res.json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateProject = updateProject;
// プロジェクトの削除
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const project = yield projectModel_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (!project.members.includes(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        yield project.remove();
        res.json({ message: 'Project removed' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteProject = deleteProject;
