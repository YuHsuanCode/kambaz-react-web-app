import {createSlice} from "@reduxjs/toolkit";
import {modules} from "../../Database";
import {v4 as uuidv4} from "uuid";

interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
}

interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons?: Lesson[];
    editing?: boolean;
}

interface ModulesState {
    modules: Module[];
}

const initialState: ModulesState = {
    modules: modules,
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers:{
        setModules: (state, {payload: modules}: {payload: Module[]}) => {
            state.modules = modules;
        },

        /** Replaces only modules for this course; stamps `course` when the API omits it. */
        setModulesForCourse: (
            state,
            {
                payload,
            }: {
                payload: { courseId: string; modules: Module[] };
            }
        ) => {
            const { courseId, modules: incoming } = payload;
            const normalized = incoming.map((m) => ({
                ...m,
                course: (m as Module).course ?? courseId,
            }));
            state.modules = [
                ...state.modules.filter(
                    (m) => String(m.course) !== String(courseId)
                ),
                ...normalized,
            ];
        },

        addModule: (state, { payload: module }: { payload: Partial<Module> & { name: string; course: string } }) => {
            const newModule: Module = {
                _id: module._id ?? uuidv4(),
                name: module.name,
                description: module.description ?? "",
                course: module.course,
                lessons: module.lessons ?? [],
            };
            state.modules = [...state.modules, newModule];
        },

        deleteModule: (state, {payload: moduleId}: {payload: string}) => {
            state.modules = state.modules.filter(
                (m) => m._id !== moduleId);
        },

        updateModule: (state, {payload: module}: {payload: Module}) => {
            state.modules = state.modules.map((m) =>
                m._id === module._id ? module : m
            );
        },

        editModule: (state, {payload: moduleId}: {payload: string})=> {
            state.modules = state.modules.map((m) =>
                m._id === moduleId ? { ...m, editing: true } : m
            );
        },
    },
});

export const {
    addModule,
    deleteModule,
    updateModule,
    editModule,
    setModules,
    setModulesForCourse,
} = modulesSlice.actions;
export default modulesSlice.reducer;