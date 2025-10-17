import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {db} from "../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
export const createTask = createAsyncThunk('/createTask', async (data) => {
    console.log(data)
    await addDoc(collection(db,'taskList'),data)
    return data
})

export const viewTask = createAsyncThunk('/viewTask', async () => {
    const result = await getDocs(query(collection(db,'taskList')))
    // console.log(result)
    let arr = []
    result.forEach((ele)=>{
        const task = {
            id:ele.id,
            ...ele.data()
        }
        arr.push(task)
    })
    return arr
})

export const deleteTask = createAsyncThunk('/deleteTask', async (id) => {
    await deleteDoc(doc(db,`taskList/${id}`))
    return id
})

export const updateTask = createAsyncThunk('/updateTask', async (data) => {
    await updateDoc(doc(db,`taskList/${data.id}`),data);
    return data
})

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskList: []
    },
    reducers: {},
    extraReducers: (res) => {
        res
            .addCase(createTask.fulfilled, (state, action) => {
                state.taskList.push(action.payload)
            })
            .addCase(viewTask.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.taskList = action.payload
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                // console.log(action.payload)
                const { id } = action.payload
                const filterData = state.taskList.filter((task) => task.id !== id)
                state.taskList = filterData
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const { id } = action.payload;
                const index = state.taskList.findIndex((task) => task.id === id)
                if (index != -1) {
                    state.taskList[index] = action.payload
                } else {
                    alert("task not found")
                }
            })
    }

})

export default taskSlice.reducer