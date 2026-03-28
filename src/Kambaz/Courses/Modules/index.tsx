import { BsGripVertical } from "react-icons/bs";
import {useParams} from "react-router";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import {useSelector, useDispatch} from "react-redux";

import {setModules,addModule, editModule, updateModule, deleteModule} from "./reducer";
import {useState, useEffect} from "react";

import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { useCoursePermissions } from "../../Account/useCoursePermissions";

export default function Modules(){
    const{cid} = useParams();
    const [moduleName, setModuleName] = useState("");
    const { canManageCourse } = useCoursePermissions();
    const canEdit = canManageCourse;

    const {modules} = useSelector((state:any) => state.modulesReducer);
    const courseModules = modules.filter((m: any) => m.course === cid);
    const dispatch = useDispatch();

    //save
    const saveModule = async (module: any)=> {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };

    //remove
    const removeModule = async(moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };

    //create
    const createModuleForCourse = async() => {
        if(!cid) return;
        const newModule = {name:moduleName, course: cid};
        const module = await coursesClient.createModuleForCourse(cid, newModule);
        dispatch(addModule(module));
    };

    //fetch
    const fetchModules = async()=>{
        const modules = await coursesClient.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };
    useEffect(()=>{
        if (cid) fetchModules();
    }, [cid]);

    return(
        <div className="wd-modules">
            <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
            addModule={createModuleForCourse} readOnly={!canEdit}/><br /><br /><br /><br/>
            
            {/*addModule={() => {
                dispatch(addModule({name: moduleName, course: cid}));
                setModuleName("");
            }} /> */}

                <ul id="wd-modules" className="list-group rounded-0">
                    {courseModules.map((module:any) => (
                        <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" /> 
                                {!module.editing && module.name}
                                {canEdit && module.editing && (
                                    <input className="form-control w-50 d-inline-block"
                                            onChange={(e) => dispatch(updateModule({...module, name:e.target.value}))}
                                            onKeyDown={(e) => {
                                                if(e.key === "Enter"){
                                                    saveModule({ ...module, editing: false });
                                                }
                                            }}
                                            defaultValue={module.name}/>
                                )}
                                <ModuleControlButtons moduleId={module._id}
                                    deleteModule={() => removeModule(module._id)}
                                    editModule={() => dispatch(editModule(module._id))}
                                    readOnly={!canEdit}
                                />
                            </div>

                            {module.lessons && (
                            <ul className="wd-lessons list-group rounded-0">
                                {module.lessons.map((lesson: any) => (

                                <li key={lesson._id ?? lesson.name} className="wd-lesson list-group-item p-3 ps-1">
                                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons readOnly={!canEdit} />
                                </li>))}
                            </ul>)}
                        </li>))}
                </ul>
        </div>
    );
}
/*
import {v4 as uuidv4} from "uuid";
 const [modules, setModules] = useState<any[]> (db.modules);
 const addModule = () => {
        setModules([...modules, {_id: uuidv4(), name:moduleName, course: cid, lessons:[] } ]);
        setModuleName("");
    };

    const deleteModule = (moduleId: string) => {
        setModules(modules.filter((m) => m._id !== moduleId));
    };

    const editModule = (moduleId: string) => {
        setModules(modules.map((m) => (m._id === moduleId ? {...m, editing: true} : m)));
    };

    const updateModule = (module: any) => {
        setModules(modules.map((m) => (m._id === module._id ? module : m)));
    };
*/

/*.filter((module:any) => module.course === cid)
                
<li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
<div className="wd-title p-3 ps-2 bg-secondary">
    <BsGripVertical className="me-2 fs-3" /> {module.name} 
    {!module.editing && module.name}
    {module.editing && (
        <input className="form-control w-50 d-inline-block"
                onChange={(e) => dispatch( updateModule({...module, name:e.target.value}))
                }
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                    dispatch(updateModule({...module, editing: false}));*
                        saveModule({ ...module, editing: false });
                    }
                }}
                defaultValue={module.name}/>
    )}
    <ModuleControlButtons moduleId = {module._id}
    deleteModule={(moduleId)=> removeModule(moduleId)}
    editModule={(moduleId)=> dispatch(editModule(moduleId))}/>
</div>
*/
