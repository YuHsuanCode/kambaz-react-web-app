import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls(
  {moduleName, setModuleName, addModule, readOnly = false} :
  { moduleName: string; 
    setModuleName:(name:string) => void; 
    addModule:() => void;
    readOnly?: boolean;
  }) {
  if (readOnly) {
    return null;
  }
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
            data-bs-toggle="modal" data-bs-target= "#wd-add-module-dialog">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module</button>

        <ModuleEditor dialogTitle="Add Module" 
                      moduleName={moduleName}
                      setModuleName={setModuleName} 
                      addModule={addModule}/>
      
      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
          type="button" data-bs-toggle="dropdown">
          <GreenCheckmark />
          Publish All</button>
        
        <ul className="dropdown-menu">
          <li>
            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish all modules and items</a>
          </li> 
          
          <li>
            <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish modules only</a>
          </li>
{/* Create two more items with IDs wd-unpublish-all-modules-and-items and wd-unpublish-modules-only with labels Unpublish all modules and items and Unpublish modules only */}
          <li>
            <a id="wd-unpublish-all-modules-and-items-btn" className="dropdown-item" href="#">
              Unpublish all modules and items
            </a>
          </li>

          <li>
            <a id="wd-unpublish-modules-only-btn" className="dropdown-item" href="#">
              Unpublish modules only
            </a>
          </li>
        </ul> 
      </div>

{/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */} 
      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-view-progress-btn" className="btn btn-lg btn-secondary"
          type="button" data-bs-toggle="dropdown">
            View Progress
        </button>
      </div>

      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-collapse-all-btn" className="btn btn-lg btn-secondary"
          type="button" data-bs-toggle="dropdown">
            Collapse All
        </button>
      </div>

      
</div>
);}