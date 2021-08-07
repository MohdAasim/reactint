import React, { useState ,useEffect} from "react";
import ListItems from './listItems';
const getstorage=()=>{
    let lists = localStorage.getItem("lists")
    console.log(lists)
    if(lists){
        return JSON.parse(localStorage.getItem("lists"))
    }else{
        return []
    }
}

const Todolist=()=>{
    const [state,setstate]=useState("");
    const [list,setlist]=useState(getstorage())
    const [isEdititem, setisEdititem]=useState(true)
    const [edititemid,setedititemid]=useState('')
    const eventhandler=(event)=>{   
       setstate(event.target.value)
    }
    const Addtolist=(event)=>{
        event.preventDefault();    
        if(!state){
                alert('please fill the item')
        }else if(state && !isEdititem){
            setlist(
            list.map((elem)=>{
                if(elem.id===edititemid){
                   return {...elem,name:state}
                }
                return elem;
            })
            )
            setisEdititem(true)
            setedititemid(' ')
            setstate('')
        }else{
        const AddItem = {id: new Date().getTime().toString(),name:state}     
        setlist((oldvalue)=>{
            return [...oldvalue,AddItem]
        }); 
        setstate(" ");
       }
    }
    const removetolist=(index)=>{
         setlist((oldvalue)=>{           
             return  oldvalue.filter((arrElem)=>{
                 return index !== arrElem.id
             })
            })      
    }
    const editItem=(index)=>{   
            const edititem = list.find((arrElem)=>{
                return arrElem.id === index
            })
            console.log(edititem,"here")             
               setisEdititem(false)
               setedititemid(index)
               setstate(edititem.name)      
    }
useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(list))
},[list])
    return(   
        <>
        <div className='cardcontainer'>
                <br></br>
            <h1 className="text-muted">Todo List</h1>
            <form onSubmit={Addtolist}>
                <div className="input-group" id='margininup'>
            <input type="text" className="form-control "
                id='inp'
                placeholder='Add' 
                onChange={eventhandler}
                value={state}
                />
                {isEdititem?<button className="btn btn-outline-success" type="button" id="bton" onClick={Addtolist}
            >+</button> :<button className="btn btn-outline-success" type="button" id="bton" onClick={Addtolist}
            >+</button> } 
            </div>
            </form>
            <hr />   
                    <ol>
                        {
                            list.map((listvalue)=>{
                                return ( <ListItems 
                                value={listvalue.name}
                                id={listvalue.id}
                                key={listvalue.id}
                                selectItem={removetolist}
                                editItem={editItem}
                                />)                  
                            })
                        }
                    </ol>
         </div>
  </>
    )
}
export default Todolist