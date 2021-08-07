import  React from "react";
import DeleteIcon from '@material-ui/icons/Delete';


const ListItems=(props)=>{
const eventhandler=(event)=>{
    // event.prevent.default()
}
return <>
        <div className="input-group" id='marginlist'>
                <DeleteIcon  type="button" id="btonDEl" 
                    onClick={()=>{ 
                        props.selectItem(props.id)
                }}
                />
                <input type="text" className="form-control "
                id='inplist'
                value={`${props.value}`}
                onChange={eventhandler}
                />    
                <button className='btn btn-primary mr-4' onClick={()=>{
                        props.editItem(props.id) 
                    }}>Edit
                </button>                 
        </div>
</>
}
export default ListItems;